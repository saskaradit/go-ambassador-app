package database

import (
	"ambassador/src/models"
	"ambassador/src/util"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatalln("cannot load config")
	}
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v", config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	fmt.Println(fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v", config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort))
	if err != nil {
		panic("Could not connect to the database")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{}, models.Product{}, models.Link{}, models.Order{}, models.OrderItem{})
}
