package application

import (
	"risqlac/application/controllers"

	echoMiddleware "github.com/labstack/echo/v4/middleware"
)

func (server *server) LoadStaticRoutes() {
	server.Instance.Use(echoMiddleware.StaticWithConfig(echoMiddleware.StaticConfig{
		Root:  "./frontend/dist",
		Index: "index.html",
		HTML5: true,
	}))
}

func (server *server) LoadSessionRoutes() {
	sessionRoutes := server.APIRootPath.Group("/session")

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
}

func (server *server) LoadUserRoutes() {
	userRoutes := server.APIRootPath.Group("/user")

	// userRoutes.GET(
	// 	"/request-password-change",
	// 	controllers.User.RequestPasswordChange,
	// )
	// userRoutes.GET(
	// 	"/change-password",
	// 	controllers.User.ChangePassword,
	// )
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
		"/request-password-change",
		controllers.User.RequestPasswordChange,
	)
}

func (server *server) LoadProductRoutes() {
	productRoutes := server.APIRootPath.Group("/product")

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
}

func (server *server) LoadReportRoutes() {
	reportRoutes := server.APIRootPath.Group("/report")

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
