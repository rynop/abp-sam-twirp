package authserver

import (
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	c "github.com/rynop/abp-sam-twirp/internal/constants"
	log "github.com/sirupsen/logrus"
	"github.com/twitchtv/twirp"
)

var secretKey = []byte(os.Getenv("JWT_SECRET_KEY"))

// CustomClaims are claims for the JWT
// @see https://trello.com/c/wrefQdsh/23-define-whats-in-jwt
type CustomClaims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	Name   string `json:"name"`
}

// PlatformClaims JWT claims for the platform
type PlatformClaims struct {
	jwt.StandardClaims
	CustomClaims
}

// Ex FireBase JWT
// {
// 	"name": "Ryan Pendergast",
// 	"picture": "https://lh5.googleusercontent.com/-t72Frb4xkyU/AAAAAAAAAAI/AAAAAAAAC3I/4rlgt1LUU8E/s96-c/photo.jpg",
// 	"iss": "https://securetoken.google.com/blah-1376e",
// 	"aud": "blah-1376e",
// 	"auth_time": 1561485434,
// 	"user_id": "aaNmTwfajO840LjCf1",
// 	"sub": "aaTlUfUV0NmTwfajO840LjCf1",
// 	"iat": 1561485434,
// 	"exp": 1561489034,
// 	"email": "user@example.com",
// 	"email_verified": true,
// 	"firebase": {
// 	  "identities": {
// 		"google.com": [
// 		  "1111028785929303132"
// 		],
// 		"email": [
// 		  "user@example.com"
// 		]
// 	  },
// 	  "sign_in_provider": "google.com"
// 	}
// }

func createJwt(claims CustomClaims, expires time.Time) (string, error) {
	c := PlatformClaims{
		jwt.StandardClaims{
			Issuer:    "PlatformApi",
			ExpiresAt: expires.Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		claims,
	}

	// TODO: make RS256
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	return t.SignedString(secretKey)
}

func validateJwt(tokenString string) (*PlatformClaims, error) {
	split := strings.Split(tokenString, " ")
	if len(split) != 2 {
		log.WithFields(log.Fields{
			"len": len(split),
		}).Error("Invalid token length")
		return nil, twirp.NewError(twirp.Unauthenticated, "Invalid platform token")
	}

	if split[0] != "Bearer" {
		log.WithFields(log.Fields{
			"scheme": split[0],
		}).Error("Invalid scheme")
		return nil, twirp.NewError(twirp.Unauthenticated, "Invalid platform token")
	}
	tokenString = split[1]
	token, err := jwt.ParseWithClaims(tokenString, &PlatformClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			log.WithFields(log.Fields{
				"scheme": split[0],
			}).Error("Unexpected token signing method")
			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid platform token")
		}

		return secretKey, nil
	})
	if err != nil {
		log.WithFields(log.Fields{
			"cause": err,
		}).Error("Problem parsing jwt")

		if strings.Contains(err.Error(), "expired") {
			twerr := twirp.NewError(twirp.Unauthenticated, "Invalid Platform Token")
			twerr = twerr.WithMeta(c.MetaKeyPlatformExpiredToken, "true")

			return nil, twerr
		}

		return nil, twirp.NewError(twirp.Unauthenticated, "Invalid platform token")
	}

	// TODO: check if revoked

	if claims, ok := token.Claims.(*PlatformClaims); ok && token.Valid {
		if claims.UserID == "" {
			log.Error("JWT missing userId claim")
			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid Platform Token")
		}
		if claims.Email == "" {
			log.Error("JWT missing email claim")
			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid Platform Token")
		}
		if claims.Name == "" {
			log.Error("JWT missing name claim")
			return nil, twirp.NewError(twirp.Unauthenticated, "Invalid Platform Token")
		}

		return claims, nil
	}

	return nil, twirp.NewError(twirp.Unauthenticated, "Invalid platform token")
}
