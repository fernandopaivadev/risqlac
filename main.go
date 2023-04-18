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
	application.Server.SetAPIRootPath("/api")
	application.Server.LoadSessionRoutes()
	application.Server.LoadUserRoutes()
	application.Server.LoadProductRoutes()
	application.Server.LoadReportRoutes()
	application.Server.LoadStaticRoutes()

	err = application.Server.Start()

	if err != nil {
		log.Fatalln(err.Error())
	}
}
