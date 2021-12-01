package main

import (
	"ambassador/src/database"
	"ambassador/src/routes"
	"ambassador/src/util"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var config util.Config

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

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
	database.SetupRedis()
	database.SetupCacheChannel()
}
