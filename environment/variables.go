package environment

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type envVars struct {
	ServerPort         string
	DatabaseUrl        string
	MailerSendAPIToken string
}

var Variables envVars

func Load() {
	err := godotenv.Load()

	if err == nil {
		log.Println(
			"environment variables loaded from .env file",
		)
	}

	Variables.ServerPort = os.Getenv("SERVER_PORT")
	Variables.DatabaseUrl = os.Getenv("DATABASE_URL")
	Variables.MailerSendAPIToken = os.Getenv("MAILER_SEND_API_TOKEN")
}
