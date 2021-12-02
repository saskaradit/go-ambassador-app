package main

import (
	"ambassador/src/database"
	"ambassador/src/routes"
	"ambassador/src/util"

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
	util.LoadConfig()
	database.ConnectDB()
	database.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChannel()
}
