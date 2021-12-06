package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"ambassador/src/util"
	"math/rand"

	"github.com/bxcodec/faker/v3"
)

func main() {
	util.LoadConfig()
	database.ConnectDB()
	for i := 0; i < 30; i++ {
		product := models.Product{
			Title:       faker.DomainName(),
			Description: faker.Sentence(),
			Image:       faker.URL(),
			Price:       float64(rand.Intn(90) + 10),
		}
		database.DB.Create(&product)
	}
}
