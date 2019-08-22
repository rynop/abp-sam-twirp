// AWS API Gateway entry point
package main

import (
	"github.com/apex/gateway"
	server "github.com/rynop/abp-sam-twirp/internal/app" 
	log "github.com/sirupsen/logrus"
)

func main() {
	handler, err := server.SetupRoutes()
	if err != nil {
		log.Error(err)
	}

	// Remember to set FIREBASE_CONFIG env var per https://firebase.google.com/docs/admin/setup/#initialize_without_parameters
	log.Error(gateway.ListenAndServe("", handler))
}
