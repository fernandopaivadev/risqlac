package services

import (
	"errors"
	"main/infra"
	"main/models"
	"time"
)

type sessionService struct{}

var Session sessionService

func (*sessionService) Create(session *models.Session) error {
	result := infra.Database.Instance.Create(&session)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*sessionService) GetByToken(token string) (models.Session, error) {
	var session models.Session

	result := infra.Database.Instance.Where(&models.Session{
		Token: token,
	}).First(&session)

	if result.Error != nil {
		return models.Session{}, result.Error
	}

	return session, nil
}

func (*sessionService) GetByUserID(userID uint64) ([]models.Session, error) {
	var sessions []models.Session

	result := infra.Database.Instance.Where(&models.Session{
		UserID: userID,
	}).Find(&sessions)

	if result.Error != nil {
		return []models.Session{}, result.Error
	}

	return sessions, nil
}

func (*sessionService) DeleteByToken(token string) error {
	result := infra.Database.Instance.Where(&models.Session{
		Token: token,
	}).Delete(&models.Session{})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*sessionService) DeleteByUserID(userID uint64) error {
	result := infra.Database.Instance.Where(&models.Session{
		UserID: userID,
	}).Delete(&models.Session{})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*sessionService) ValidateToken(token string) (models.Session, models.User, error) {
	session, err := Session.GetByToken(token)

	if err != nil {
		return models.Session{}, models.User{}, err
	}

	if time.Now().Unix() > session.ExpiresAt.Unix() {
		_ = Session.DeleteByToken(session.Token)
		return models.Session{}, models.User{}, errors.New("token expired")
	}

	user, err := User.GetByID(session.UserID)

	if err != nil {
		return models.Session{}, models.User{}, err
	}

	return session, user, nil
}
