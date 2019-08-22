 ## Running TypeScript sanity tests

 This tests both the TS JSON and Protobuf client.  Currnetly using https://github.com/rynop/protoc-gen-twirp_typescript fork.

 See `main.ts` for entry point

  1. `cp build-ts-clients/ts-test/dotenv.example build-ts-clients/ts-test/.env`. Get FirebaseToken from mobile app, update `.env`. 
  1. `make dynamo/init`
  1. `make run/cli-server`
  1. `make client/test-ts-clients`