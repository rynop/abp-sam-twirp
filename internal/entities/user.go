package entities

// DDBTypeUser the type value for the DDB SK
const DDBTypeUser = "USER"

// User entities
type User struct {
	ID    string `dynamodbav:"PK,omitempty"`
	Type  string `dynamodbav:"SK,omitempty"` // Always 'USER'
	Name  string `dynamodbav:",omitempty"`
	Email string `dynamodbav:",omitempty"`
}
