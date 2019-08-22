package authserver

import (
	"context"
	"net/http"
	"os"
	"testing"

	rpc "github.com/rynop/abp-sam-twirp/rpc-clients/go/platform"
	"github.com/stretchr/testify/require"
	"github.com/twitchtv/twirp"
)

func TestToken(t *testing.T) {
	req := require.New(t)
	port := os.Getenv("LISTEN_PORT")
	client := rpc.NewAuthSvcProtobufClient("http://localhost:"+port, &http.Client{})

	_, err := client.Token(context.Background(), &rpc.TokenReq{FirebaseToken: "invalid"})
	if nil != err {
		if twerr, ok := err.(twirp.Error); ok {
			req.Equal(twirp.Unauthenticated, twerr.Code())
			req.Equal("Invalid FBase token", twerr.Msg())
		}
	} else {
		req.Fail("Did not get invalid token err")
	}
}
