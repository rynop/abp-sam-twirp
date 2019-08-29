package main

import (
	"fmt"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/cors"
	server "github.com/rynop/abp-sam-twirp/internal/app"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetLevel(log.DebugLevel)
	port := os.Getenv("LISTEN_PORT")
	handler, err := server.SetupRoutes()
	if err != nil {
		log.Fatalf("%+v", err)
	}

	// CORS options match CloudFront in aws/cloudformation/sam-template.yml
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token"},
		AllowCredentials: true,
		MaxAge:           604800,
		Debug:            true,
	}).Handler(handler)

	fmt.Printf("Listening on :%v\n", port)
	http.ListenAndServe(":"+port, c)
}
