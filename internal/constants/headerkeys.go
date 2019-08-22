package constants

// JWT's take the following form: header.payload.signature

// TokenHeaderAndPayloadCookieKey cookie contains header.payload
const TokenHeaderAndPayloadCookieKey string = "platform-token-header-payload"

// TokenSignatureCookieKey cookie contains signature
const TokenSignatureCookieKey string = "platform-token-sig"
