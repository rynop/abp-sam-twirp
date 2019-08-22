package authserver

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	c "github.com/rynop/abp-sam-twirp/internal/constants"
	"github.com/rynop/abp-sam-twirp/internal/utils"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
)

// endpoints that do not check JWT platform token
// format: <ServiceName>/<MethodName>
var bypassAuthRoutes = []string{
	"AuthSvc/Token",
	"PartnerSvc/GetNearPoint",
	"PartnerSvc/GetActiveEvents",
}

/**
Auth model --

- Login reqests send firebase token message
- If successful, we'll create a new token and
	- write respose to two part cookie (web client) platform-token-header-payload, platform-token-sig
	- write token to response message
- On all subesequent requests
	- web client will pass cookies
	- grpc/twirp client will pass Authorization header
- authHeadersHandler will look at every request and if no Authorization header (has priority)
  will check for cookies and rebuild into Authorization header.
- When routing request we will validate token in Authorization header and verify user has the right role
- Prior to responding we need to write cache(and others) headers, update cookie expire time, and rewrite cookie?
*/

// AuthHeadersHandler If client is web create Authorization header out of cookies
func AuthHeadersHandler(h http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		var authorization string
		// If a client passes the Auth header, ignore cookies
		if authorization = r.Header.Get("Authorization"); authorization == "" {
			// Initial login will not have any cookies or the auth header
			if cookie, err := r.Cookie(c.TokenHeaderAndPayloadCookieKey); err == nil {
				authorization = fmt.Sprintf("Bearer %s", reconstititeJwt(r))
				ctx = context.WithValue(ctx, c.CtxKeyHeaderPayloadCookie, cookie)
			}
		}
		// Store the writer into the context to be able to write headers/cookies to it later
		ctx = context.WithValue(ctx, c.CtxKeyResponseWriter, w)
		// Write the auth header here so we can verify later
		ctx = context.WithValue(ctx, c.CtxKeyAuthorization, authorization)

		h.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Build a jwt out of the two cookies
func reconstititeJwt(r *http.Request) string {
	hp, err := r.Cookie(c.TokenHeaderAndPayloadCookieKey)
	if err != nil {
		log.WithFields(log.Fields{
			"cookie": c.TokenHeaderAndPayloadCookieKey,
			"cause":  err,
		}).Error("Unable to get cookie")
		return ""
	}
	sig, err := r.Cookie(c.TokenSignatureCookieKey)
	if err != nil {
		log.WithFields(log.Fields{
			"cookie": c.TokenSignatureCookieKey,
			"cause":  err,
		}).Error("Unable to get cookie")
		return ""
	}
	return fmt.Sprintf("%s.%s", hp.Value, sig.Value)
}

// Gets called after a token has been validated
func writeResponseHeaders(ctx context.Context) {
	w, ok := ctx.Value(c.CtxKeyResponseWriter).(http.ResponseWriter)
	if !ok {
		log.Error("Error: Unable to get ResponseWriter from ctx in updateCookieExpireTime")
		return
	}
	w.Header().Add("Cache-control", "no-cache, no-store")

	c, ok := ctx.Value(c.CtxKeyHeaderPayloadCookie).(*http.Cookie)
	if !ok {
		// If non-cookie client, get out of here
		return
	}
	c.Expires = time.Now().Local().Add(time.Minute * 30)
	http.SetCookie(w, c)
}

// RequestRoutedCallback validate JWT from header
func RequestRoutedCallback(ctx context.Context) (context.Context, error) {
	svcName, _ := twirp.ServiceName(ctx)
	methodName, _ := twirp.MethodName(ctx)

	// Bypass auth for these service/methods
	if utils.StringInSlice(svcName+"/"+methodName, bypassAuthRoutes) {
		return ctx, nil
	}

	// Check auth header
	authorization, ok := ctx.Value(c.CtxKeyAuthorization).(string)
	if !ok {
		return ctx, twirp.NewError(twirp.Unauthenticated, "Unable to get request headers")
	}
	claims, err := validateJwt(authorization)
	if err != nil {
		return ctx, err
	}
	ctx = context.WithValue(ctx, c.CtxKeyEmail, claims.Email)
	ctx = context.WithValue(ctx, c.CtxKeyUserID, claims.UserID)
	ctx = context.WithValue(ctx, c.CtxKeyName, claims.Name)
	// Token is valid so update expire time and write to response
	writeResponseHeaders(ctx)

	return ctx, nil
}

// ResponsePreparedCallback is called after our implementation is called, but prior to writing to response
func ResponsePreparedCallback(ctx context.Context) context.Context {
	return ctx
}

// See https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
func writeTwoPartCookie(ctx context.Context, tokenString string, expires time.Time) error {
	// we can't use twirp.SetHTTPResponseHeader as you need to call Header().Add(..) rather than
	// Header().Set(..) to put cookies onto the response
	writer, ok := ctx.Value(c.CtxKeyResponseWriter).(http.ResponseWriter)
	if !ok {
		return twirp.NewError(twirp.Internal, "Unable to get ResponseWriter. Internal error of some sort")
	}
	parts := strings.Split(tokenString, ".")
	// Payload cookie is NOT HttpOnly, so that JS can access is
	// Same-site to prevent CSRF. @see http://www.sjoerdlangkemper.nl/2016/04/14/preventing-csrf-with-samesite-cookie-attribute/
	c1 := &http.Cookie{Name: c.TokenHeaderAndPayloadCookieKey, Value: fmt.Sprintf("%s.%s", parts[0], parts[1]), Secure: true, Expires: expires, SameSite: http.SameSiteLaxMode}
	// HttpOnly so JS cant access
	c2 := &http.Cookie{Name: c.TokenSignatureCookieKey, Value: parts[2], Secure: true, HttpOnly: true, Expires: expires, SameSite: http.SameSiteLaxMode}
	// break jwt into two parts and set cookie
	writer.Header().Add("Set-Cookie", c1.String())
	writer.Header().Add("Set-Cookie", c2.String())

	return nil
}
