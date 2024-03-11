package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type env struct {
	ServerPort        string
	DatabaseFile      string
	PlunkSecretAPIKey string
}

var Env env

func (*env) Load() {
	err := godotenv.Load()

	if err == nil {
		log.Println(
			"environment variables loaded from .env file",
		)
	}

	Env.DatabaseFile = os.Getenv("DATABASE_FILE")
	Env.PlunkSecretAPIKey = os.Getenv("PLUNK_SECRET_API_KEY")

	Env.ServerPort = os.Getenv("SERVER_PORT")

	if Env.ServerPort == "" {
		Env.ServerPort = "3000"
	}
}
