module github.com/rynop/abp-sam-twirp

go 1.12

// Until https://github.com/larrymyers/protoc-gen-twirp_typescript/pull/41 is merged
replace go.larrymyers.com/protoc-gen-twirp_typescript => github.com/rynop/protoc-gen-twirp_typescript v0.0.0-20190629012806-ebc891e79fcf

require (
	firebase.google.com/go v3.8.1+incompatible
	github.com/apex/gateway v1.1.1
	github.com/aws/aws-lambda-go v1.11.1 // indirect
	github.com/aws/aws-sdk-go v1.20.4
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gogo/protobuf v1.2.1 // indirect
	github.com/golang/protobuf v1.3.1
	github.com/joho/godotenv v1.3.0
	github.com/mwitkow/go-proto-validators v0.0.0-20190212092829-1f388280e944
	github.com/pkg/errors v0.8.1 // indirect
	github.com/rs/cors v1.6.0
	github.com/segmentio/ksuid v1.0.2
	github.com/sirupsen/logrus v1.4.2
	github.com/stretchr/testify v1.2.2
	github.com/tj/assert v0.0.0-20171129193455-018094318fb0 // indirect
	github.com/twitchtv/twirp v5.7.0+incompatible
	go.larrymyers.com/protoc-gen-twirp_typescript v0.0.0-00010101000000-000000000000
	golang.org/x/lint v0.0.0-20190409202823-959b441ac422
	golang.org/x/tools v0.0.0-20190618163018-fdf1049a943a // indirect
	google.golang.org/api v0.6.0
)
