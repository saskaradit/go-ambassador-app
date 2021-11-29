package main

import (
	"ambassador/src/database"
	"ambassador/util"
	"log"

	"github.com/gofiber/fiber/v2"
)

var config util.Config

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

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
