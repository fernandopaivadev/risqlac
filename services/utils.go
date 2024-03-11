package services

import (
	"github.com/go-playground/validator/v10"
)

type utilsService struct{}

var Utils utilsService

func (*utilsService) ValidateStruct(data interface{}) error {
	validate := validator.New()
	return validate.Struct(data)
}
