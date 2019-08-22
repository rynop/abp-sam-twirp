package awsutils

import (
	"context"
	"fmt"
	"reflect"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
)

// MarshalMap is an alias for dynamodbattribute.MarshalMap
// It will log if there is an error in the Marshal process (which should always be logged)
func MarshalMap(in interface{}) (map[string]*dynamodb.AttributeValue, error) {
	av, err := dynamodbattribute.MarshalMap(in)
	if nil != err {
		log.WithFields(log.Fields{
			"cause": err,
			"data":  fmt.Sprintf("%+v", in),
		}).Error("Problem marshaling User in GetUserByID")
	}
	return av, err
}

// UnmarshalMap is an alias for dynamodbattribute.UnmarshalMap
// It will log if there is an error in the Unmarshal process (which should always be logged)
func UnmarshalMap(m map[string]*dynamodb.AttributeValue, out interface{}) error {
	err := dynamodbattribute.UnmarshalMap(m, out)
	if err != nil {
		log.WithFields(log.Fields{
			"cause": err,
			"data":  fmt.Sprintf("%+v", m),
		}).Error("Problem unmarshaling")
		return twirp.NewError(twirp.Internal, "Could not unmarshal "+reflect.TypeOf(out).Name())
	}
	return nil
}

// UnmarshalListOfMaps wrapper
func UnmarshalListOfMaps(l []map[string]*dynamodb.AttributeValue, out interface{}) error {
	err := dynamodbattribute.UnmarshalListOfMaps(l, out)
	if err != nil {
		log.WithFields(log.Fields{
			"cause": err,
			"data":  fmt.Sprintf("%+v", l),
		}).Error("Problem unmarshaling")
		return twirp.NewError(twirp.Internal, "Could not unmarshal "+reflect.TypeOf(out).Name())
	}
	return nil
}

// GetItem wraps dynamo.GetItem. Gives us opportunity to react to issues and do fail-over
func GetItem(input *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	dynamo := GetDynamoClient()
	input.TableName = &DynamoPlatformTableName

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// TODO: how do we recover from DDB timeouts, and do a re-try?

	return dynamo.GetItemWithContext(ctx, input)
}

// PutItem wraps dynamo.PutItem. Gives us opportunity to react to issues and do fail-over
func PutItem(input *dynamodb.PutItemInput) (*dynamodb.PutItemOutput, error) {
	dynamo := GetDynamoClient()
	input.TableName = &DynamoPlatformTableName

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// TODO: how do we recover from DDB timeouts

	return dynamo.PutItemWithContext(ctx, input)
}

// Query wrapper
func Query(input *dynamodb.QueryInput) (*dynamodb.QueryOutput, error) {
	dynamo := GetDynamoClient()
	input.TableName = &DynamoPlatformTableName

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// TODO: how do we recover from DDB timeouts, and do a re-try?

	return dynamo.QueryWithContext(ctx, input)
}
