package awsutils

import (
	"os"
	"sync"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	log "github.com/sirupsen/logrus"
)

var (
	// DynamoClient that is dynamodb local aware or region waterfall
	DynamoClient = &atomicData{}
	// AwsSess session for non dynamo services
	AwsSess = &atomicData{}

	// DynamoPlatformTableName {APP_STAGE}-Platform
	DynamoPlatformTableName string
)

type atomicData struct {
	data   interface{}
	rwLock sync.RWMutex
}

func (m *atomicData) Get() interface{} {
	m.rwLock.RLock()
	defer m.rwLock.RUnlock()
	return m.data
}

func (m *atomicData) set(data interface{}) {
	m.rwLock.Lock()
	defer m.rwLock.Unlock()
	m.data = data
}

func init() {
	awsRegion := os.Getenv("AWS_REGION")
	appStage := os.Getenv("APP_STAGE")

	DynamoPlatformTableName = os.Getenv("DDB_TABLENAME")

	// TODO: make dynamo client waterfall to other DYNAMO_DB_REGION_WATERFALL
	// when problems detected, call some sort of doWaterfall method
	dynamoConfig := &aws.Config{Region: &awsRegion}
	if "local" == appStage {
		dynamoConfig.Endpoint = aws.String("http://localhost:8000")
	} else if "sam-local" == appStage {
		dynamoConfig.Endpoint = aws.String("http://dynamo:8000")
	}
	dynamoSess, err := session.NewSession(dynamoConfig)
	if err != nil {
		log.WithFields(log.Fields{
			"config": dynamoConfig,
		}).Fatal("Problem creating initial Dynamo session")
	}
	DynamoClient.set(dynamodb.New(dynamoSess))

	// AWS session for non-dynamo services
	svcSess, err := session.NewSession(&aws.Config{Region: &awsRegion})
	if err != nil {
		log.WithFields(log.Fields{
			"config": dynamoConfig,
		}).Fatal("Problem creating initial AWS session")
	}
	AwsSess.set(svcSess)
}

// GetDynamoClient get Dynamo DB Client
// TODO: should I be returning dynamodb.DynamoDB pointer here?
func GetDynamoClient() *dynamodb.DynamoDB {
	return DynamoClient.Get().(*dynamodb.DynamoDB)
}

// LogAwsErr log out aws error and code
func LogAwsErr(err error) {
	if aerr, ok := err.(awserr.Error); ok {
		log.WithFields(log.Fields{
			"reason": aerr.Error(),
			"code":   aerr.Code(),
		}).Error("AWS service error")
	} else {
		log.WithFields(log.Fields{
			"reason": err.Error(),
		}).Error("AWS service error")
	}
}
