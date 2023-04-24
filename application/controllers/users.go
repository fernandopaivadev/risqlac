package controllers

import (
	"risqlac/application/models"
	"risqlac/application/services"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type userController struct{}

var User userController

func (*userController) Create(context echo.Context) error {
	var user models.User
	err := context.Bind(&user)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing body",
			"error":   err.Error(),
		})
	}

	err = services.Utils.ValidateStruct(user)

	if err != nil {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   err.Error(),
		})
	}

	if user.IsAdmin >= 1 {
		user.IsAdmin = 1
	}

	err = services.User.Create(user)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error creating user",
			"error":   err.Error(),
		})
	}

	return context.JSON(201, echo.Map{
		"message": "user created",
	})
}

func (*userController) Update(context echo.Context) error {
	headers := context.Request().Header
	isAdmin := headers["Isadmin"][0] == "1"
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	var user models.User
	err = context.Bind(&user)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing body",
			"error":   err.Error(),
		})
	}

	if !(isAdmin || tokenUserId == user.Id) {
		return context.JSON(403, echo.Map{
			"message": "not allowed for not admin users",
		})
	}

	user.Password = "..." // needs a not empty value to pass validation
	err = services.Utils.ValidateStruct(user)

	if err != nil {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   err.Error(),
		})
	}

	if isAdmin && user.IsAdmin >= 1 {
		user.IsAdmin = 1
	} else {
		user.IsAdmin = 0
	}

	err = services.User.Update(user)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error updating user",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "user updated",
	})
}

func (*userController) List(context echo.Context) error {
	headers := context.Request().Header
	isAdmin := headers["Isadmin"][0] == "1"
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	if !isAdmin {
		user, err := services.User.GetById(tokenUserId)

		if err != nil {
			return context.JSON(500, echo.Map{
				"message": "error retrieving user",
				"error":   err.Error(),
			})
		}

		return context.JSON(200, echo.Map{
			"users": []models.User{user},
		})
	}

	userId, _ := strconv.ParseUint(context.QueryParam("id"), 10, 64)

	if userId != 0 {
		user, err := services.User.GetById(userId)

		if err != nil {
			return context.JSON(500, echo.Map{
				"message": "error retrieving user",
				"error":   err.Error(),
			})
		}

		return context.JSON(200, echo.Map{
			"users": []models.User{user},
		})
	}

	users, err := services.User.List()

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error retrieving users",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"users": users,
	})
}

func (*userController) Delete(context echo.Context) error {
	headers := context.Request().Header
	isAdmin := headers["Isadmin"][0] == "1"
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	userId, err := strconv.ParseUint(context.QueryParam("id"), 10, 64)

	if err != nil {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   err.Error(),
		})
	}

	if !(isAdmin || tokenUserId == userId) {
		return context.JSON(403, echo.Map{
			"message": "not allowed for not admin users",
		})
	}

	err = services.User.Delete(userId)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error deleting user",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "user deleted",
	})
}

func (*userController) RequestPasswordReset(context echo.Context) error {
	email := context.QueryParam("email")

	if email == "" {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   "user email is required",
		})
	}

	user, err := services.User.GetByEmail(email)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error retrieving user",
			"error":   err.Error(),
		})
	}

	passwordChangeToken := uuid.NewString()

	err = services.Session.Create(&models.Session{
		UserId:        user.Id,
		Token:         passwordChangeToken,
		PasswordReset: 1,
		ExpiresAt:     time.Now().Add(5 * time.Minute),
	})

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error generating token",
			"error":   err.Error(),
		})
	}

	passwordResetUrl := "https://risqlac.com.br/#/reset-password?" + passwordChangeToken

	err = services.Utils.SendEmail(
		user.Email,
		"Reset de senha",
		"Link para o reset de senha: <a href=\""+passwordResetUrl+"\">"+passwordResetUrl+"</a>",
	)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error sending email",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "email sent",
	})
}

func (*userController) ChangePassword(context echo.Context) error {
	headers := context.Request().Header
	tokenUserId, err := strconv.ParseUint(headers["Userid"][0], 10, 64)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error parsing token user id",
			"error":   err.Error(),
		})
	}

	newPassword := context.QueryParam("new_password")

	if newPassword == "" {
		return context.JSON(400, echo.Map{
			"message": "validation error",
			"error":   "new password is required",
		})
	}

	err = services.User.ChangePassword(tokenUserId, newPassword)

	if err != nil {
		return context.JSON(500, echo.Map{
			"message": "error changing password",
			"error":   err.Error(),
		})
	}

	return context.JSON(200, echo.Map{
		"message": "password updated",
	})
}
