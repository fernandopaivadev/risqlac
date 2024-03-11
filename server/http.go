package server

import (
	"errors"
	"main/config"
	"net/http"

	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

type httpServer struct {
	instance    *echo.Echo
	apiRootPath *echo.Group
	appRootPath *echo.Group
}

var HTTPServer httpServer

func (server *httpServer) Setup() {
	server.instance = echo.New()

	server.instance.Use(echomiddleware.Recover())
	server.instance.Use(echomiddleware.Logger())
	server.instance.Use(echomiddleware.RequestID())
	server.instance.Use(echomiddleware.GzipWithConfig(echomiddleware.GzipConfig{
		Level: 5,
	}))
	server.instance.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
			http.MethodHead,
			http.MethodOptions,
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
		},
	}))
	server.instance.Use(echomiddleware.SecureWithConfig(echomiddleware.SecureConfig{
		XSSProtection:      "1; mode=block",
		XFrameOptions:      "deny",
		ContentTypeNosniff: "nosniff",
	}))
}

func (server *httpServer) Start() error {
	serverPort := ":" + config.Env.ServerPort

	err := server.instance.Start(serverPort)

	if err != nil {
		return errors.New("error starting server: " + err.Error())
	}

	return nil
}

func (server *httpServer) setAPIRootPath(path string) {
	server.apiRootPath = server.instance.Group(path)
}

func (server *httpServer) setAppRootPath(path string) {
	server.appRootPath = server.instance.Group(path)
}
