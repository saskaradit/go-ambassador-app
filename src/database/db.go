package database

import (
	"ambassador/src/models"
	"ambassador/util"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatalln("cannot load config")
	}
	DB, err = gorm.Open(mysql.Open(fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", config.DBUser, config.DBPassword, config.DBHost, config.DBPort, config.DBName)), &gorm.Config{})
	fmt.Println(fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", config.DBUser, config.DBPassword, config.DBHost, config.DBPort, config.DBName))
	if err != nil {
		panic("Could not connect to the database")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{})
}
