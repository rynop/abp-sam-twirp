package services

import (
	"fmt"
	"strings"

	fBaseAuth "firebase.google.com/go/auth"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/rynop/abp-sam-twirp/internal/awsutils"
	c "github.com/rynop/abp-sam-twirp/internal/constants"
	"github.com/rynop/abp-sam-twirp/internal/entities"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
)

// GetUserByID gets user by UUID
func GetUserByID(id string, consistentRead bool) (*entities.User, error) {
	d := &entities.User{
		ID:   id,
		Type: entities.DDBTypeUser,
	}
	av, err := awsutils.MarshalMap(d)
	if nil != err {
		return nil, err
	}

	input := &dynamodb.GetItemInput{
		Key:            av,
		TableName:      &awsutils.DynamoPlatformTableName,
		ConsistentRead: &consistentRead,
	}

	res, err := awsutils.GetItem(input)
	if err != nil {
		awsutils.LogAwsErr(err)
		return nil, twirp.NewError(twirp.NotFound, "User not found")
	}
	if len(res.Item) == 0 {
		return nil, twirp.NewError(twirp.NotFound, "User not found")
	}

	err = awsutils.UnmarshalMap(res.Item, d)
	if err != nil {
		return nil, err
	}

	return d, nil
}

// CreateEndUserFromFBase from Firbase token if user DNE
func CreateEndUserFromFBase(firebaseToken *fBaseAuth.Token) (*entities.User, error) {
	email, ok := firebaseToken.Claims["email"].(string)
	if !ok || email == "" {
		twerr := twirp.NewError(twirp.Unauthenticated, "FBase Token missing email address")
		twerr = twerr.WithMeta(c.MetaKeyFBaseEmailMissingFromToken, "true")
		return nil, twerr
	}

	fbaseUserID, ok := firebaseToken.Claims["user_id"].(string)
	if !ok || email == "" {
		twerr := twirp.NewError(twirp.Unauthenticated, "FBase Token missing user_id address")
		twerr = twerr.WithMeta(c.MetaKeyFBaseUserIDMissingFromToken, "true")
		return nil, twerr
	}

	// TODO: firebase token should not require name, we need to prompt client side if DNE
	name, ok := firebaseToken.Claims["name"].(string)
	if !ok || name == "" {
		return nil, twirp.NewError(twirp.Unauthenticated, "FBase Token missing name")
	}

	// could pull other claims such as email_verified, picture, auth_time, sign_in_provider, etc? out of token
	return createEndUser(fbaseUserID, email, name)
}

// Creates an end user (if DNE)
func createEndUser(fbaseUserID string, email string, name string) (*entities.User, error) {
	email = strings.ToLower(email)

	if usr, err := GetUserByID(fbaseUserID, true); err == nil {
		log.WithFields(log.Fields{
			"in":   "createEndUser",
			"user": usr,
		}).Debug("User already exists, returning...")
		return usr, nil
	}

	log.WithFields(log.Fields{
		"in":    "createEndUser",
		"email": email,
		"ID":    fbaseUserID,
	}).Debug("Didn't find end user by Firebase ID, creating...")

	d := &entities.User{
		ID:    fbaseUserID,
		Type:  entities.DDBTypeUser,
		Name:  name,
		Email: email,
	}

	av, err := awsutils.MarshalMap(d)
	if nil != err {
		return nil, err
	}

	putInput := &dynamodb.PutItemInput{
		Item: av,
	}
	if _, err = awsutils.PutItem(putInput); err != nil {
		log.WithFields(log.Fields{
			"cause": err,
			"user":  fmt.Sprintf("%+v", d),
		}).Error("Problem PutItem User")
		return nil, err
	}

	return d, nil
}
