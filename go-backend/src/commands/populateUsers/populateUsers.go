package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"ambassador/src/util"

	"github.com/bxcodec/faker/v3"
)

func main() {
	util.LoadConfig()
	database.ConnectDB()
	for i := 0; i < 30; i++ {
		ambassador := models.User{
			FirstName:    faker.FirstName(),
			LastName:     faker.LastName(),
			Email:        faker.Email(),
			IsAmbassador: true,
		}
		ambassador.SetPassword("1234")
		database.DB.Create(&ambassador)
	}
}
