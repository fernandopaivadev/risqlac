package main

import (
	"log"
	"risqlac/application"
	"risqlac/environment"
	"risqlac/infrastructure"
)

func main() {
	environment.Load()

	err := infrastructure.Database.Connect()

	if err != nil {
		log.Fatalln(err.Error())
	}

	application.Server.Setup()
	application.Server.LoadApiRoutes("/api")
	application.Server.LoadAppRoutes("")

	err = application.Server.Start()

	if err != nil {
		log.Fatalln(err.Error())
	}
}
