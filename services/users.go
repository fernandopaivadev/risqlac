package services

import (
	"main/infra"
	"main/models"

	"golang.org/x/crypto/bcrypt"
)

type userService struct{}

var User userService

func (service *userService) ValidateCredentials(email, password string) (models.User, error) {
	user, err := service.GetByEmail(email)

	if err != nil {
		return models.User{}, err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)

	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (*userService) ChangePassword(userID uint64, newPassword string) error {
	passwordHash, err := bcrypt.GenerateFromPassword(
		[]byte(newPassword),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	result := infra.Database.Instance.Model(&models.User{
		ID: userID,
	}).Updates(models.User{
		Password: string(passwordHash),
	})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) Create(user *models.User) error {
	passwordHash, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user.Password = string(passwordHash)

	if user.IsAdmin > 0 {
		user.IsAdmin = 1
	}

	result := infra.Database.Instance.Create(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) Update(user *models.User) error {
	if user.IsAdmin > 0 {
		user.IsAdmin = 1
	}

	result := infra.Database.Instance.Model(&user).Select(
		"Email", "Name", "Phone", "Is_admin",
	).Updates(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) GetByID(userID uint64) (models.User, error) {
	var user models.User

	result := infra.Database.Instance.First(&user, userID)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func (*userService) GetByEmail(email string) (models.User, error) {
	var user models.User

	result := infra.Database.Instance.Where(&models.User{
		Email: email,
	}).First(&user)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func (*userService) List() ([]models.User, error) {
	var users []models.User

	result := infra.Database.Instance.Find(&users)

	if result.Error != nil {
		return []models.User{}, result.Error
	}

	return users, nil
}

func (*userService) Delete(userID uint64) error {
	result := infra.Database.Instance.Delete(&models.User{}, userID)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
