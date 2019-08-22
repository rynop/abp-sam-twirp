package utils

import (
	"context"
	"fmt"
	"strings"

	"github.com/twitchtv/twirp"
)

// StringAfter get substring after a string.
func StringAfter(value string, a string) string {
	pos := strings.LastIndex(value, a)
	if pos == -1 {
		return ""
	}
	adjustedPos := pos + len(a)
	if adjustedPos >= len(value) {
		return ""
	}
	return value[adjustedPos:len(value)]
}

// GetRequiredCtxValueString gets a string value out of a context, throwing if not set
func GetRequiredCtxValueString(ctx context.Context, key interface{}) (string, error) {
	v, ok := ctx.Value(key).(string)
	if !ok || "" == v {
		return "", twirp.RequiredArgumentError(fmt.Sprintf("%v", key))
	}
	return v, nil
}

// StringInSlice is string in slice?
func StringInSlice(str string, list []string) bool {
	for _, v := range list {
		if v == str {
			return true
		}
	}
	return false
}
