package main

import (
	"ambassador/src/database"
	"ambassador/src/routes"
	"ambassador/src/util"
	"log"

	"github.com/gofiber/fiber/v2"
)

var config util.Config

func main() {
	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8080")
}

func init() {
	var err error
	config, err = util.LoadConfig(".")
	if err != nil {
		log.Fatalln("cannot load config")
	}
	database.ConnectDB()
	database.AutoMigrate()
}
