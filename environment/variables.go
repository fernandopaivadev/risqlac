package environment

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type envVars struct {
	ServerPort        string
	DatabaseUrl       string
	PlunkSecretAPIkey string
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
	Variables.PlunkSecretAPIkey = os.Getenv("PLUNK_SECRET_API_KEY")
}
