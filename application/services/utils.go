package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"risqlac/environment"

	"github.com/go-playground/validator/v10"
)

type utilsService struct{}

var Utils utilsService

func (*utilsService) ValidateStruct(data interface{}) error {
	validate := validator.New()
	return validate.Struct(data)
}

func (*utilsService) SendEmail(
	to string,
	subject string,
	content string,
) error {
	body, _ := json.Marshal(map[string]string{
		"to":      to,
		"subject": subject,
		"body":    content,
	})

	request, err := http.NewRequest(
		"POST",
		"https://api.useplunk.com/v1/send",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return err
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set(
		"Authorization", "Bearer "+environment.Variables.PlunkSecretAPIkey,
	)

	client := &http.Client{}

	response, err := client.Do(request)

	if err != nil {
		return err
	}

	responseBodyBytes, _ := io.ReadAll(response.Body)
	responseBodyString := string(responseBodyBytes)

	if response.StatusCode != 200 {
		return errors.New(responseBodyString)
	}

	return nil
}
