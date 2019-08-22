module github.com/rynop/abp-sam-twirp

go 1.12

// Until https://github.com/larrymyers/protoc-gen-twirp_typescript/pull/41 is merged
replace go.larrymyers.com/protoc-gen-twirp_typescript => github.com/rynop/protoc-gen-twirp_typescript v0.0.0-20190629012806-ebc891e79fcf

require (
	firebase.google.com/go v3.8.1+incompatible
	github.com/apex/gateway v1.1.1
	github.com/aws/aws-sdk-go v1.20.4
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/golang/protobuf v1.3.1
	github.com/joho/godotenv v1.3.0
	github.com/mwitkow/go-proto-validators v0.0.0-20190212092829-1f388280e944
	github.com/segmentio/ksuid v1.0.2
	github.com/sirupsen/logrus v1.4.2
	github.com/snaptab/platform-api v0.0.0-20190712213953-1ed1fc6e588b // indirect
	github.com/stretchr/testify v1.2.2
	github.com/twitchtv/twirp v5.7.0+incompatible
	go.larrymyers.com/protoc-gen-twirp_typescript v0.0.0-00010101000000-000000000000
	golang.org/x/lint v0.0.0-20190409202823-959b441ac422
	google.golang.org/api v0.6.0
)
