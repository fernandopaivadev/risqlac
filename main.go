package main

import (
	"log"
	"main/config"
	"main/infra"
	"main/server"
)

func main() {
	config.Env.Load()

	err := infra.Database.Connect(config.Env.DatabaseFile)

	if err != nil {
		log.Fatalln(err.Error())
	}

	server.HTTPServer.Setup()
	server.HTTPServer.LoadAPIRoutes("/api")
	server.HTTPServer.LoadAppRoutes("")

	err = server.HTTPServer.Start()

	if err != nil {
		log.Fatalln(err.Error())
	}
}
