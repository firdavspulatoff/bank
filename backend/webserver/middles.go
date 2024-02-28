package webserver

import "github.com/gin-contrib/cors"
var (
corsMiddleware = cors.New(cors.Config{
	//AllowOrigins:     allowedOrigins,
	AllowMethods: []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS", "HEAD"},
	AllowHeaders: []string{"Origin", "Content-type", "Authorization", "Auth", "sign", "key", "k", "s", "Accept-Language"},
	// ExposeHeaders:    []string{"Content-Length"},
	//AllowCredentials: true,
	AllowOriginFunc: checkOrigin,
	//MaxAge:           12 * time.Hour,
}))

func checkOrigin(origin string) bool {

	return true

}