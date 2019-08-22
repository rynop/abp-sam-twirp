# abp-sam-twirp

[aws-blueprint](https://github.com/rynop/aws-blueprint) example for a [Twirp](https://github.com/twitchtv/twirp) based API using AWS [Serverless Application Module (SAM)](https://github.com/awslabs/serverless-application-model).

Features:

-  Multi-stage CI/CD via CodePipeline.  Convention over configuration, designed for teams and feature branches.
-  CloudFront -> API Gateway -> Lambda (running Twirp). JSON as and `application/protobuf` binary support
-  Straight forward environment variable configuration.  Supports pulling from SSM when running in AWS.
-  Simulate API Gateway -> Lambda locally via `sam local start-api`.  Talks to DynamoDB local via docker-compose.
-  Local dev server with hot-reload (quicker developer iterations than `sam local`).
-  [DynamoDB local](https://hub.docker.com/r/amazon/dynamodb-local) with [tools](./dynamodb) to create table(s) and load data.
-  Realtime CodePipeline source pulls via GitHub webhook.
-  Example showcases exchanging [FireBase auth](https://firebase.google.com/docs/auth) token for platform API JWT Token. Platform token passing utilizes [2-part cookies](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3).
-  Twirp and sam local working with [go modules](https://github.com/golang/go/wiki/Modules)
-  Go module vendoring
-  Automatic route53 alias entries with stage prefix. Ex: `test--api.exaple.com`. HTTPS support via ACM.

## Prerequisites

1.  [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
1.  Create a [github access token](https://github.com/settings/tokens). This token will be used by the CI/CD to pull code. Required scopes: ` admin:repo_hook, repo`
1.  S3 bucket to hold Lambda deployment zips. Only need 1 bucket per AWS account.
1.  Docker
1.  An SNS topic for CI/CD code promotion approvals. Subscribe your email address to it.
1.  Firebase account with Firebase Auth enabled
1.  Golang >= 1.12 (for go module support)

## Quickstart - local dev server with auto-reload

1.  `cp dotenv.example .env`
1.  Download a FBase [SDK private key JSON file](https://firebase.google.com/docs/admin/setup). Paste as one line into `.env::GOOGLE_APPLICATION_CREDENTIALS_JSON`.  On macOS: `cat firebase-adminsdk.json | jq -c . | pbcopy`.  `.env` is only used when starting the server directly (not inside `sam local`).  [Feat req](https://github.com/awslabs/aws-sam-cli/issues/1355) to address this.
1.  `make setup/local` will install go tooling and load local DynamoDB with sample data (dropping table if exists).
1.  `make run/local-dev-api` will `go run` server locally.
1.  Run `curl -H 'Content-Type:application/json' -d '{"firebaseToken":"invalid"}' http:/localhost:8080/com.abpsamtwirp.platform.AuthSvc/Token`

You should get an `Invalid FBase token` error.  To get a valid FBase token, implement [one of the SDKs](https://firebase.google.com/docs/auth) into your app.


## Simulate APIG + Lambda locally

This repo utlizes `sam local start-api` [cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-start-api.html) to simulate APIG->Lambda->Twirp.

Enviornment variables are pulled from [sam-template.yml](./aws/cloudformation/sam-template.yml)`::Environment.Variables` (not `.env`).  To simulate how these will be set in cloudformation, the `--parameter-overrides` `sam` option is used.  See `run/sam-local-api` in [Makefile](./Makefile) for an example.

1. `cp aws/sam-local/api-env.json aws/sam-local/sample-api-env.json`
1. Copy FBase SDK private key json to [aws/sam-local/api-env.json](./aws/sam-local/api-env.json), `GOOGLE_APPLICATION_CREDENTIALS_JSON` attribute as one line (`cat firebase-adminsdk.json | jq -c '. | tojson' | pbcopy` on macOS). This file is used to set env when running `sam local`.
1. `make run/sam-start-api`
1. Open http://127.0.0.1:3000/v1 and look at the console for the app env vars.

Startup is slow right? This simulates Lambda cold starts. See [here](https://github.com/awslabs/aws-sam-cli/issues/239).

## Calling the API (Twirp)

Running `make api-clients` will generate clients for golang ([rpc-clients/go](./rpc-clients/go)), Typescript using Protobuf ([rpc-clients/ts-protobuf](./rpc-clients/ts-protobuf/)), Typescript using JSON ([rpc-clients/ts-json](./rpc-clients/ts-json/))

An example using Typescript clients can be seen at [build-ts-clients/ts-test/main.ts](./build-ts-clients/ts-test/main.ts).

An example using golang client can be seen at [internal/authserver/server_test.go](./internal/authserver/server_test.go).

## Deploying to AWS via CI/CD (AWS CodePipeline) using GitHub webhook

The CloudFormation parameters `SSMFirebaseAdminSdkCreds` and `SSMJwtSecret` in [sam-template.yml](./aws/cloudformation/sam-template.yml) dictates where in [SSM](https://console.aws.amazon.com/systems-manager/parameters) to pull a value, which is then set as an env var in the lambda. In CodePipeline you set these parameter value on a stage-by-stage basis via [aws/cloudformation/parameters](./aws/cloudformation/parameters).  If you update the value in SSM, just execute a stack update to [get the new env var into lambda](https://aws.amazon.com/blogs/mt/integrating-aws-cloudformation-with-aws-systems-manager-parameter-store/).

1. Clone this repo
1. From [SSM Console](https://console.aws.amazon.com/systems-manager/parameters) create a SSM parameter for every `SSM*` parameter defined in `aws/cloudformation/parameters/*.json`. For the SSM Param `name` use the **VALUE** of the `SSM*` attribute.
1. Create a CI/CD pipeline via [CloudFormation](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template) using [aws/cloudformation/pipeline.yml](./aws/cloudformation/pipeline.yml) using the name `abp-sam-twirp--master--api--cicd` (naming convention is `[gitrepo]--[branch]--[eyecatcher]--cicd`)
1. `git push` and watch the [pipeline](https://console.aws.amazon.com/codesuite/codepipeline/pipelines).  Will need to approve to promote to next stage.  URL to your API is in the `outputs` of the `ExecuteChangeSet` CloudFormation.

## Tips

- Scan DynamoDB local: `aws dynamodb scan --table-name local-SingleTable --endpoint-url http://localhost:8000`

## TODO:
 
 - Remove values from aws/cloudformation/parameters/*.json
