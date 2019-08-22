package main

import (
	"fmt"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
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

	fmt.Printf("Listening on :%v\n", port)
	http.ListenAndServe(":"+port, handler)
}
