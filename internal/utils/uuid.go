package utils

import "github.com/segmentio/ksuid"

// GenUUID returns a UUID
func GenUUID() string {
	return ksuid.New().String()
}
