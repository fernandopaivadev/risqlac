package controllers

import (
	"fmt"
	"risqlac/application/models"
	"risqlac/application/services"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type sessionController struct{}

var Session sessionController

func (*sessionController) Login(context echo.Context) error {
	email := context.QueryParam("email")
	password := context.QueryParam("password")

	if email == "" || password == "" {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   "email and password are required",
		})
	}

	user, err := services.User.ValidateCredentials(email, password)

	fmt.Println(user.Id)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error validating user credentials",
			"error":   err.Error(),
		})
	}

	token := uuid.NewString()

	err = services.Session.Create(&models.Session{
		Token:     token,
		UserId:    user.Id,
		ExpiresAt: time.Now().Add(24 * time.Hour),
	})

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error creating session",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"token": token,
	})
}

func (*sessionController) List(context echo.Context) error {
	headers := context.Request().Header
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	sessions, err := services.Session.GetByUserId(tokenUserId)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error retrieving sessions",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"sessions": sessions,
	})
}

func (*sessionController) Logout(context echo.Context) error {
	headers := context.Request().Header
	token := headers["Authorization"][0]

	err := services.Session.DeleteByToken(token)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error logging out",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "user successfully logged out",
	})
}

func (*sessionController) CompleteLogout(context echo.Context) error {
	headers := context.Request().Header
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	err = services.Session.DeleteByUserId(tokenUserId)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error logging out",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "user successfully logged out of all sessions",
	})
}
