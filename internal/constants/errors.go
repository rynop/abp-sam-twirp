package constants

const (
	// **** Twirp Error Meta Keys. @see https://twitchtv.github.io/twirp/docs/errors.html#metadata

	// MetaKeyFBaseExpiredToken indicates token has expired
	MetaKeyFBaseExpiredToken = "fbase_token_expired"

	// MetaKeyFBaseEmailMissingFromToken indicates token didnt include email in claim
	MetaKeyFBaseEmailMissingFromToken = "fbase_token_missing_email"

	// MetaKeyFBaseUserIDMissingFromToken indicates token didnt include user_id claim
	MetaKeyFBaseUserIDMissingFromToken = "fbase_token_missing_user_id"

	// MetaKeyPlatformExpiredToken indicates token has expired
	MetaKeyPlatformExpiredToken = "expired_platform_token"
)
