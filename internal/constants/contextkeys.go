package constants

type contextKey string

var (
	// CtxKeyResponseWriter writes response to header
	CtxKeyResponseWriter = contextKey("ResponseWriter")
	// CtxKeyHeaderPayloadCookie for JWT in 2 cookies
	CtxKeyHeaderPayloadCookie = contextKey("HeaderPayloadCookie")
	// CtxKeyAuthorization header
	CtxKeyAuthorization = contextKey("Authorization")

	// CtxKeyUserID current userId (from JWT) in context
	CtxKeyUserID = contextKey("UserId")
	// CtxKeyEmail current user email (from JWT) in context
	CtxKeyEmail = contextKey("Email")
	// CtxKeyName current user name (from JWT) in context
	CtxKeyName = contextKey("Name")
)
