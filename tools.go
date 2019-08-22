// +build tools

package tools

import (
	// protocol buffer compiler plugins
	_ "github.com/golang/protobuf/protoc-gen-go"
	_ "github.com/mwitkow/go-proto-validators/protoc-gen-govalidators"
	_ "github.com/twitchtv/twirp/protoc-gen-twirp"
	_ "go.larrymyers.com/protoc-gen-twirp_typescript"

	// go tools
	_ "github.com/joho/godotenv/cmd/godotenv"
	_ "golang.org/x/lint/golint"
)
