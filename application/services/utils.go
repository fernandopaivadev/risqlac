package services

import (
	"context"
	"fmt"
	"risqlac/environment"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/mailersend/mailersend-go"
)

type utilsService struct{}

var Utils utilsService

func (*utilsService) ValidateStruct(data interface{}) error {
	validate := validator.New()
	return validate.Struct(data)
}

func (*utilsService) SendEmail(
	receiverName string,
	receiverEmailAddress string,
	senderName string,
	senderEmailAddress string,
	subject string,
	plainTextContent string,
	htmlContent string,
) error {
	sender := mailersend.NewMailersend(environment.Variables.MailerSendAPIToken)

	from := mailersend.From{
		Name:  senderName,
		Email: senderEmailAddress,
	}

	recipients := []mailersend.Recipient{
		{
			Name:  receiverName,
			Email: receiverEmailAddress,
		},
	}

	message := sender.Email.NewMessage()

	message.SetFrom(from)
	message.SetRecipients(recipients)
	message.SetSubject(subject)
	message.SetHTML(htmlContent)
	message.SetText(plainTextContent)

	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	response, err := sender.Email.Send(ctx, message)

	fmt.Println(response)

	if err != nil {
		return err
	}

	return nil
}
