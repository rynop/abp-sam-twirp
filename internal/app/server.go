package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/rynop/abp-sam-twirp/internal/authserver"
	rpc "github.com/rynop/abp-sam-twirp/rpc-clients/go/platform"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
	"google.golang.org/api/option"
)

var (
	reqEnvs  = [...]string{"AWS_REGION", "APP_STAGE", "DDB_TABLENAME", "JWT_SECRET_KEY", "GOOGLE_APPLICATION_CREDENTIALS_JSON"}
	fbaseApp *firebase.App
)

func init() {
	// Dump all env vars
	// for _, pair := range os.Environ() {
	// 	fmt.Println(pair)
	// }

	for _, envKey := range reqEnvs {
		if _, ok := os.LookupEnv(envKey); !ok {
			log.Fatal(envKey + " env var must be set: " + os.Getenv(envKey))
		}
	}

	fbase, err := firebase.NewApp(context.Background(), nil, option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON"))))
	if err != nil {
		log.Fatal("Unable to init firebase admin SDK")
	}
	fbaseApp = fbase
}

// SetupRoutes sets up the server routes
func SetupRoutes() (http.Handler, error) {
	mux := http.NewServeMux()
	hooks := &twirp.ServerHooks{RequestRouted: authserver.RequestRoutedCallback, ResponsePrepared: authserver.ResponsePreparedCallback}

	authSvr := rpc.NewAuthSvcServer(&authserver.Server{Firebase: fbaseApp}, hooks)
	authSvrHTTPHandler := authserver.AuthHeadersHandler(authSvr)
	// From CDN and TypeScript Clients (no /twirp prefix)
	mux.HandleFunc(strings.TrimPrefix(rpc.AuthSvcPathPrefix, "/twirp"), shortPathHandler(authSvrHTTPHandler))
	// From local go client tests, or maybe future go server2server clients
	mux.HandleFunc(rpc.AuthSvcPathPrefix, authSvrHTTPHandler)

	return mux, nil
}

// For clients that send a request that don't have a leading /twirp, add it onto the path and
// forward to normal handler
func shortPathHandler(h http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		r.URL.Path = fmt.Sprintf("/twirp%s", r.URL.Path)
		h.ServeHTTP(w, r.WithContext(ctx))
	})
}
