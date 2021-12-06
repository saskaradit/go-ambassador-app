package database

import (
	"ambassador/src/models"
	"ambassador/src/util"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	config := util.Conf
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v", config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort)
	fmt.Println(dsn)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Could not connect to the database")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{}, models.Product{}, models.Link{}, models.Order{}, models.OrderItem{})
}
