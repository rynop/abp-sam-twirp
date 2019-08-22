
# Thank you https://github.com/aspiration-labs/pyggpot/blob/master/Makefile
include makefiles/shellvars.mk
include makefiles/osvars.mk

.PHONY: all clean run* install* setup* tools*

setup/local: install/go-tools run/dynamo-init

install: install/go-tools
	#-t: download pkg required to build test, 
	# TODO: in CI, think of disabling go tools from using network via GOPROXY=off and pulling from vendor
	# see https://github.com/golang/go/wiki/Modules#can-i-control-when-gomod-gets-updated-and-when-the-go-tools-use-the-network-to-satisfy-dependencies
	# see https://github.com/thepudds/go-module-knobs/blob/master/README.md
	GO111MODULE=on go get -v -t ./...

install/go-tools: clean/go-vendor tools/go-vendor $(GO_TOOLS_DIR) $(PROTOC) $(GO_TOOLS_VENDOR)
	# TODO: in CI, think of disabling go tools from using network via GOPROXY=off and pulling from vendor
	GOBIN="$(PWD)/$(GO_TOOLS_BIN)" go install -mod=vendor $(GO_TOOLS)

# 
# Builders
#
all: api-clients

api-server: 
	GO111MODULE=on GOOS=linux GOARCH=amd64 go build -o ./build/api ./cmd/apigateway/main.go

api-clients: clients/go clients/ts-protobuf clients/ts-json

#
# Cleaners
#
clean/api-clients:
	rm -vf rpc-clients/*

clean/go-vendor:
	rm -rf vendor

clean/go-tools: clean/go-vendor
	rm -rf "$(GO_TOOLS_DIR)"

#
# Runners
#
run/ngrok-api:
	# Let ngrok handle HTTPS.  Vaild SSL cert needed for mobile dev. @see https://rynop.com/2019/05/09/howto-mobile-development-against-a-localhost-https-api/
	ngrok http -bind-tls=true -subdomain=$(shell hostname)-my-platform-api 8081

# Run API locally using .env
run/local-dev-api: run/dynamo-up
	go run cmd/local/main.go

# Simulate API Gateway->Lambda locally.  Env vars defined in aws/cloudformation/sam-template.yml
# Overridden by --parameter-overrides below
# and aws/sam-local/api-env.json for values not set from CloudFormation parameters (ex !Ref to a S3 bucket created in sam-template.yml)
run/sam-local-api: run/dynamo-up api-server
	sam local start-api -t aws/cloudformation/sam-template.yml --profile default \
	--docker-network abp-sam-twirp-backend \
	--parameter-overrides 'ParameterKey=StageName,ParameterValue=local ParameterKey=DDBTableName,ParameterValue=local-SingleTable ParameterKey=SomeSecretInSSM,ParameterValue=SecretSetInSamLocalParameterOverrides' \
	--env-vars aws/sam-local/api-env.json

run/dynamo-up:
	cd docker && docker-compose up -d dynamo

# Load local DynamoDB with sample data (dropping table if exists)
run/dynamo-init: run/dynamo-up	
	./dynamodb/create-schema-locally.sh
	./dynamodb/load-data-locally.sh SingleTable

run/dynamo-down:
	cd docker && docker-compose stop dynamo

run/docker-down:
	cd docker && docker-compose down

# Do this in lieu of run/docker-down @see https://docs.docker.com/compose/reference/down/
run/docker-remove-volume:
	cd docker && docker-compose down --volumes
	
#
# Build Twirp API Clients
# Clients: go, typescript pb (web), typescript json (NativeScript)
# We build ALL clients at once, every time, to keep them all in lock-step
#
PROTOBUF_PB_FILES := rpc-clients/go/platform/platform.pb.go
PROTOBUF_TWIRP_FILES := rpc-clients/go/platform/platform.twirp.go
PROTOBUF_TS_PB_TWIRP_FILES := rpc-clients/ts-protobuf/platform.twirp.ts
PROTOBUF_TS_PB_FILES := rpc-clients/ts-protobuf/platform.pb.js rpc-clients/ts-protobuf/platform.pb.d.ts

# Everything we build from platform.proto
# Note: see go.mod as I'm using a fork of go.larrymyers.com/protoc-gen-twirp_typescript to support gaps in ts json client
rpc-clients/go/platform/platform.pb.go \
rpc-clients/go/platform/platform.twirp.go \
rpc-clients/go/platform/platform.validator.pb.go \
rpc-clients/ts-json/platform.ts \
rpc-clients/ts-json/twirp.ts \
rpc-clients/ts-protobuf/platform.twirp.ts \
  : proto/platform/platform.proto
	PATH="$(GO_TOOLS_BIN):$$PATH" $(PROTOC) \
            --proto_path=./proto \
            --proto_path=./vendor \
            --twirp_out=./rpc-clients/go \
            --go_out=./rpc-clients/go \
            --govalidators_out=./rpc-clients/go \
			--twirp_typescript_out=version=v6:./rpc-clients/ts-json \
			--twirp_typescript_out=library=pbjs,version=v6:./rpc-clients/ts-protobuf/ \
            $< && rm -f rpc-clients/ts-json/validator.ts rpc-clients/ts-json/descriptor.ts

clients/dirs:
	mkdir -p rpc-clients/go
	mkdir -p rpc-clients/ts-protobuf
	mkdir -p rpc-clients/ts-json

clients/go: clients/dirs $(PROTOBUF_PB_FILES) $(PROTOBUF_TWIRP_FILES)
	
clients/ts-protobuf: clients/dirs $(PROTOBUF_TS_PB_FILES)
	
# Some platforms (like NativeScript and React) don't support sending binary
# this ts json client is for these platforms
clients/ts-json: clients/dirs rpc-clients/ts-json/platform.ts rpc-clients/ts-json/twirp.ts	
	cp build-ts-clients/ts-json-index.ts rpc-clients/ts-json/index.ts

# TypeScript protobuf client
$(PROTOBUF_TS_PB_FILES): proto/platform/platform.proto $(PROTOBUF_TS_PB_TWIRP_FILES)
	cd build-ts-clients && yarn install && yarn config set abp-sam-twirp-platform-api:rpc platform && yarn run gen:ts-pb-client

#
# Tools
#
tools/go-lint:
	$(GO_TOOLS_BIN)/golint -set_exit_status ./internal/... ./cmd/...

tools/go-vet:
	go vet ./cmd/...

tools/go-vendor:
	go mod vendor

#
# Quality control
#
test: run/dynamo-init
	PATH="$(GO_TOOLS_BIN):$$PATH" $(GO_TOOLS_BIN)/godotenv -f ./.env go test ./internal/... -cover

test-verbose: run/dynamo-init
	PATH="$(GO_TOOLS_BIN):$$PATH" $(GO_TOOLS_BIN)/godotenv -f ./.env go test ./internal/... -cover -v

# Shows logging, reguardless if tests pass or not
test/coverage-html:
	go test ./internal/... -cover -coverprofile=coverage.out	
	go tool cover -html=coverage.out -o coverage.html

test/ts-clients:
	cd build-ts-clients/ts-test && yarn install && yarn run build && cd dist && node main.js

#
# Setup: protoc+plugins, other tools
# 
# @see https://github.com/aspiration-labs/pyggpot/blob/master/Makefile
#
# Note that go mod vendor will bring down *versioned* tools base on go.mod. Yay.
# We use tools.go to trick go mod into getting our tools for local builds.
# See the following for inspiration:
#   https://github.com/golang/go/wiki/Modules#how-can-i-track-tool-dependencies-for-a-module
#   https://github.com/golang/go/issues/25922
#   https://github.com/go-modules-by-example/index/blob/master/010_tools/README.md
#   

# go tools vars
GO_TOOLS_DIR := ./tools
GO_TOOLS_BIN := $(GO_TOOLS_DIR)/bin
GO_TOOLS_VENDOR := $(addprefix vendor/, $(GO_TOOLS))

# protoc vars
PROTOC_VERSION := 3.7.1
PROTOC_RELEASES_PATH := https://github.com/protocolbuffers/protobuf/releases/download
PROTOC_ZIP := protoc-$(PROTOC_VERSION)-$(PROTOC_PLATFORM).zip
PROTOC_DOWNLOAD := $(PROTOC_RELEASES_PATH)/v$(PROTOC_VERSION)/$(PROTOC_ZIP)
PROTOC := $(GO_TOOLS_BIN)/protoc

# go installed tools.go
GO_TOOLS := github.com/golang/protobuf/protoc-gen-go \
            github.com/twitchtv/twirp/protoc-gen-twirp \
			github.com/mwitkow/go-proto-validators/protoc-gen-govalidators \
			go.larrymyers.com/protoc-gen-twirp_typescript \
			github.com/joho/godotenv/cmd/godotenv \
			golang.org/x/lint/golint

$(GO_TOOLS_DIR):
	mkdir -v -p $@

# download protoc
$(GO_TOOLS_DIR)/$(PROTOC_ZIP):
	curl --location $(PROTOC_DOWNLOAD) --output $@

# install protoc
$(PROTOC): $(GO_TOOLS_DIR)/$(PROTOC_ZIP)
	unzip -o -d "$(GO_TOOLS_DIR)" $< && touch $@
