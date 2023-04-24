package application

import (
	"fmt"
	"risqlac/application/services"

	"github.com/labstack/echo/v4"
)

type middleware struct{}

var Middleware middleware

func (*middleware) ValidateSessionToken(next echo.HandlerFunc) echo.HandlerFunc {
	return func(context echo.Context) error {
		headers := context.Request().Header
		token := headers["Authorization"][0]
		session, user, err := services.Session.ValidateToken(token)

		if err != nil {
			return context.JSON(401, echo.Map{
				"message": "session token validation error",
				"error":   err.Error(),
			})
		}

		if session.PasswordReset == 1 && context.Path() != "/api/user/reset-password" {
			return context.JSON(403, echo.Map{
				"message": "this token is only for password reset",
			})
		}

		context.Request().Header.Add("UserId", fmt.Sprint(user.Id))
		context.Request().Header.Add("IsAdmin", fmt.Sprint(user.IsAdmin))

		return next(context)
	}
}

func (*middleware) VerifyAdmin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(context echo.Context) error {
		headers := context.Request().Header
		isAdmin := headers["Isadmin"][0] == "1"

		if !isAdmin {
			return context.JSON(403, echo.Map{
				"message": "not allowed for not admin users",
			})
		}

		return next(context)
	}
}
