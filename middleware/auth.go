package middleware

import (
	"main/services"
	"strconv"

	"github.com/labstack/echo/v4"
)

type auth struct{}

var Auth auth

func (*auth) ValidateSessionToken(next echo.HandlerFunc) echo.HandlerFunc {
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

		context.Request().Header.Add("UserId", strconv.FormatUint(user.ID, 10))
		context.Request().Header.Add("IsAdmin", strconv.FormatBool(user.IsAdmin > 0))

		return next(context)
	}
}

func (*auth) VerifyAdmin(next echo.HandlerFunc) echo.HandlerFunc {
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
