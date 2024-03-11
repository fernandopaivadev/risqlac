package server

import (
	"main/controllers"
	"main/middleware"

	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func (server *httpServer) LoadAPIRoutes(path string) {
	server.setAPIRootPath(path)

	sessionRoutes := server.apiRootPath.Group("/session")
	sessionRoutes.GET(
		"/login",
		controllers.Session.Login,
	)
	sessionRoutes.GET(
		"/list",
		controllers.Session.List,
		middleware.Auth.ValidateSessionToken,
	)
	sessionRoutes.DELETE(
		"/logout",
		controllers.Session.Logout,
		middleware.Auth.ValidateSessionToken,
	)
	sessionRoutes.DELETE(
		"/complete-logout",
		controllers.Session.CompleteLogout,
		middleware.Auth.ValidateSessionToken,
	)

	userRoutes := server.apiRootPath.Group("/user")
	userRoutes.POST(
		"/create",
		controllers.User.Create,
		middleware.Auth.ValidateSessionToken,
		middleware.Auth.VerifyAdmin,
	)
	userRoutes.PUT(
		"/update",
		controllers.User.Update,
		middleware.Auth.ValidateSessionToken,
	)
	userRoutes.GET(
		"/list",
		controllers.User.List,
		middleware.Auth.ValidateSessionToken,
	)
	userRoutes.DELETE(
		"/delete",
		controllers.User.Delete,
		middleware.Auth.ValidateSessionToken,
	)
	userRoutes.GET(
		"/request-password-reset",
		controllers.User.RequestPasswordReset,
	)
	userRoutes.PATCH(
		"/reset-password",
		controllers.User.ChangePassword,
		middleware.Auth.ValidateSessionToken,
	)

	productRoutes := server.apiRootPath.Group("/product")
	productRoutes.POST(
		"/create",
		controllers.Product.Create,
		middleware.Auth.ValidateSessionToken,
		middleware.Auth.VerifyAdmin,
	)
	productRoutes.PUT(
		"/update",
		controllers.Product.Update,
		middleware.Auth.ValidateSessionToken,
		middleware.Auth.VerifyAdmin,
	)
	productRoutes.GET(
		"/list",
		controllers.Product.List,
		middleware.Auth.ValidateSessionToken,
	)
	productRoutes.DELETE(
		"/delete",
		controllers.Product.Delete,
		middleware.Auth.ValidateSessionToken,
		middleware.Auth.VerifyAdmin,
	)

	reportRoutes := server.apiRootPath.Group("/report")
	reportRoutes.GET(
		"/products/pdf",
		controllers.Report.GetProductsReportPDF,
		middleware.Auth.ValidateSessionToken,
	)
	reportRoutes.GET(
		"/products/csv",
		controllers.Report.GetProductsReportCSV,
		middleware.Auth.ValidateSessionToken,
	)
	reportRoutes.GET(
		"/products/xlsx",
		controllers.Report.GetProductsReportXLSX,
		middleware.Auth.ValidateSessionToken,
	)
}

func (server *httpServer) LoadAppRoutes(path string) {
	server.setAppRootPath(path)

	server.instance.Use(echomiddleware.StaticWithConfig(echomiddleware.StaticConfig{
		Root:  "./frontend/dist",
		Index: "index.html",
		HTML5: true,
	}))
}
