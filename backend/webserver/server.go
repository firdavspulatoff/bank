package webserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Start() {
	router := gin.Default()
	router.Use(corsMiddleware)

	// setSocketRoutes(router)
	// setChatRoutes(router)
	// setAccountRoutes(router)
	setUserRoutes(router)
	setDebitRoutes(router)
	setCreditRoutes(router)
	// setIntegrationRoutes(router)
	// setServiceRoutes(router)

	srv := &http.Server{
		Addr:    "0.0.0.0:8080",
		Handler: router,
	}

	srv.ListenAndServe()
}
