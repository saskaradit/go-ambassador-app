package database

import (
	"ambassador/src/models"
	"ambassador/util"
	"fmt"
	"log"
	"net/url"

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
	dsn := url.URL{
		User:     url.UserPassword(config.DBUser, config.DBPassword),
		Scheme:   "postgres",
		Host:     fmt.Sprintf("%s:%d", config.DBHost, config.DBPort),
		Path:     config.DBName,
		RawQuery: (&url.Values{"sslmode": []string{"disable"}}).Encode(),
	}

	DB, err = gorm.Open(postgres.Open(dsn.String()), &gorm.Config{})
	fmt.Println(fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", config.DBUser, config.DBPassword, config.DBHost, config.DBPort, config.DBName))
	if err != nil {
		panic("Could not connect to the database")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{})
}
