package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"main/config"
	"net/http"
)

type mailingService struct{}

var Mailing mailingService

func (*mailingService) SendEmail(
	to string,
	subject string,
	content string,
) error {
	body, err := json.Marshal(map[string]string{
		"to":      to,
		"subject": subject,
		"body":    content,
	})

	if err != nil {
		return err
	}

	request, err := http.NewRequest(
		http.MethodPost,
		"https://api.useplunk.com/v1/send",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return err
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set(
		"Authorization", "Bearer "+config.Env.PlunkSecretAPIKey,
	)

	client := &http.Client{}

	response, err := client.Do(request)

	if err != nil {
		return err
	}

	responseBodyBytes, err := io.ReadAll(response.Body)
	defer response.Body.Close()

	if err != nil {
		return err
	}

	if response.StatusCode != http.StatusOK {
		return errors.New(string(responseBodyBytes))
	}

	return nil
}
