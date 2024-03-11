package infra

import (
	"errors"
	"main/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type database struct {
	Instance *gorm.DB
}

var Database database

func (database *database) Connect(databaseFile string) error {
	db, err := gorm.Open(sqlite.Open("data/"+databaseFile), &gorm.Config{})

	if err != nil {
		return errors.New("failed to connect to the database")
	}

	errorList := []error{}

	errorList = append(
		errorList,
		db.AutoMigrate(&models.User{}),
		db.AutoMigrate(&models.Session{}),
		db.AutoMigrate(&models.Product{}),
	)

	for _, err := range errorList {
		if err != nil {
			return err
		}
	}

	database.Instance = db

	return nil
}
