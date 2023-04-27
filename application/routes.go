package application

import (
	"risqlac/application/controllers"

	echoMiddleware "github.com/labstack/echo/v4/middleware"
)

func (server *server) LoadApiRoutes(path string) {
	server.setApiRootPath(path)

	sessionRoutes := server.apiRootPath.Group("/session")
	sessionRoutes.GET(
		"/login",
		controllers.Session.Login,
	)
	sessionRoutes.GET(
		"/list",
		controllers.Session.List,
		Middleware.ValidateSessionToken,
	)
	sessionRoutes.DELETE(
		"/logout",
		controllers.Session.Logout,
		Middleware.ValidateSessionToken,
	)
	sessionRoutes.DELETE(
		"/complete-logout",
		controllers.Session.CompleteLogout,
		Middleware.ValidateSessionToken,
	)

	userRoutes := server.apiRootPath.Group("/user")
	userRoutes.POST(
		"/create",
		controllers.User.Create,
		Middleware.ValidateSessionToken,
		Middleware.VerifyAdmin,
	)
	userRoutes.PUT(
		"/update",
		controllers.User.Update,
		Middleware.ValidateSessionToken,
	)
	userRoutes.GET(
		"/list",
		controllers.User.List,
		Middleware.ValidateSessionToken,
	)
	userRoutes.DELETE(
		"/delete",
		controllers.User.Delete,
		Middleware.ValidateSessionToken,
	)
	userRoutes.GET(
		"/request-password-reset",
		controllers.User.RequestPasswordReset,
	)
	userRoutes.PATCH(
		"/reset-password",
		controllers.User.ChangePassword,
		Middleware.ValidateSessionToken,
	)

	productRoutes := server.apiRootPath.Group("/product")
	productRoutes.POST(
		"/create",
		controllers.Product.Create,
		Middleware.ValidateSessionToken,
		Middleware.VerifyAdmin,
	)
	productRoutes.PUT(
		"/update",
		controllers.Product.Update,
		Middleware.ValidateSessionToken,
		Middleware.VerifyAdmin,
	)
	productRoutes.GET(
		"/list",
		controllers.Product.List,
		Middleware.ValidateSessionToken,
	)
	productRoutes.DELETE(
		"/delete",
		controllers.Product.Delete,
		Middleware.ValidateSessionToken,
		Middleware.VerifyAdmin,
	)

	reportRoutes := server.apiRootPath.Group("/report")
	reportRoutes.GET(
		"/products/pdf",
		controllers.Report.GetProductsReportPDF,
		Middleware.ValidateSessionToken,
	)
	reportRoutes.GET(
		"/products/csv",
		controllers.Report.GetProductsReportCSV,
		Middleware.ValidateSessionToken,
	)
	reportRoutes.GET(
		"/products/xlsx",
		controllers.Report.GetProductsReportXLSX,
		Middleware.ValidateSessionToken,
	)
}

func (server *server) LoadAppRoutes(path string) {
	server.setAppRootPath(path)

	server.instance.Use(echoMiddleware.StaticWithConfig(echoMiddleware.StaticConfig{
		Root:  "./frontend/dist",
		Index: "index.html",
		HTML5: true,
	}))
}
