package services

import (
	"risqlac/application/models"
	"risqlac/infrastructure"

	"golang.org/x/crypto/bcrypt"
)

type userService struct{}

var User userService

func (service *userService) ValidateCredentials(email string, password string) (models.User, error) {
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

func (*userService) ChangePassword(userId uint64, newPassword string) error {
	passwordHash, err := bcrypt.GenerateFromPassword(
		[]byte(newPassword),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	result := infrastructure.Database.Instance.Model(&models.User{
		Id: userId,
	}).Updates(models.User{
		Password: string(passwordHash),
	})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) Create(user models.User) error {
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

	result := infrastructure.Database.Instance.Create(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) Update(user models.User) error {
	if user.IsAdmin > 0 {
		user.IsAdmin = 1
	}

	result := infrastructure.Database.Instance.Model(&user).Select(
		"Email", "Name", "Phone", "Is_admin",
	).Updates(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*userService) GetById(userId uint64) (models.User, error) {
	var user models.User

	result := infrastructure.Database.Instance.First(&user, userId)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func (*userService) GetByEmail(email string) (models.User, error) {
	var user models.User

	result := infrastructure.Database.Instance.Where(&models.User{
		Email: email,
	}).First(&user)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func (*userService) List() ([]models.User, error) {
	var users []models.User

	result := infrastructure.Database.Instance.Find(&users)

	if result.Error != nil {
		return []models.User{}, result.Error
	}

	return users, nil
}

func (*userService) Delete(userId uint64) error {
	result := infrastructure.Database.Instance.Delete(&models.User{}, userId)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
