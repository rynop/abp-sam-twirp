package authserver

import (
	"context"
	"strings"
	"time"

	firebase "firebase.google.com/go"
	c "github.com/rynop/abp-sam-twirp/internal/constants"
	"github.com/rynop/abp-sam-twirp/internal/entities"
	svcs "github.com/rynop/abp-sam-twirp/internal/services"
	rpc "github.com/rynop/abp-sam-twirp/rpc-clients/go/platform"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
)

const (
	expireFromNow = time.Hour * 24 * 90
)

// Server implements the service
type Server struct{ Firebase *firebase.App }

// Token is called whenever the client needs a token. If first "login" the client will pass us a firebase token
// otherwise we have a token we've already created so we need to validate, and create a new one
func (s *Server) Token(ctx context.Context, msg *rpc.TokenReq) (*rpc.TokenRes, error) {
	if err := msg.Validate(); err != nil {
		return nil, twirp.InvalidArgumentError(err.Error(), "")
	}

	var user *entities.User

	if msg.FirebaseToken != "" { // Logging in from the mobile app with Firebase
		client, err := s.Firebase.Auth(ctx)
		if err != nil {
			log.WithFields(log.Fields{
				"cause": err,
			}).Error("FB Auth client init failed")
			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid FBase token")
		}
		token, err := client.VerifyIDToken(ctx, msg.FirebaseToken)
		if err != nil {
			log.WithFields(log.Fields{
				"cause": err,
			}).Error("FB ID token verification failed")

			if strings.Contains(err.Error(), "expired") {
				twerr := twirp.NewError(twirp.Unauthenticated, "Invalid FBase Token")
				twerr = twerr.WithMeta(c.MetaKeyFBaseExpiredToken, "true")

				return nil, twerr
			}

			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid FBase token")
		}

		if user, err = svcs.CreateEndUserFromFBase(token); err != nil {
			log.WithFields(log.Fields{
				"cause": err,
			}).Error("Can't create user from FBase token")
			return nil, twirp.NewError(twirp.Unknown, "Problem creating user")
		}
	} else {
		return nil, twirp.NewError(twirp.Unauthenticated, "Missing Token")
	}

	expires := time.Now().Add(expireFromNow)

	claims := CustomClaims{
		Email:  user.Email,
		UserID: user.ID,
		Name:   user.Name,
	}

	jwt, err := createJwt(claims, expires)
	if err != nil {
		log.WithFields(log.Fields{
			"cause": err,
		}).Error("Problem creating JWT")
		return nil, twirp.NewError(twirp.Internal, "Problem creating Token")
	}
	writeTwoPartCookie(ctx, jwt, expires)

	return &rpc.TokenRes{Jwt: jwt, Exp: expires.Unix()}, nil
}
