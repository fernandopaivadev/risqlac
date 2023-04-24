package infrastructure

import (
	"errors"
	"risqlac/application/models"
	"risqlac/environment"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type database struct {
	Instance *gorm.DB
}

var Database database

func (database *database) Connect() error {
	dsn := environment.Variables.DatabaseUrl + "?tls=true&parseTime=true"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return errors.New("failed to connect to the database")
	}

	var errors []error

	errors = append(errors, db.AutoMigrate(&models.User{}))
	errors = append(errors, db.AutoMigrate(&models.Session{}))
	errors = append(errors, db.AutoMigrate(&models.Product{}))

	for _, err := range errors {
		if err != nil {
			return err
		}
	}

	database.Instance = db

	return nil
}
