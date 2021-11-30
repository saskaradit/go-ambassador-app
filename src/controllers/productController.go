package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Products(c *fiber.Ctx) error {
	var products []models.Product

	database.DB.Find(&products)

	return c.JSON(products)
}

func CreateProduct(c *fiber.Ctx) error {
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return err
	}

	if product.Title == "" || product.Price == 0 || product.Description == "" {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "please input all the fields",
		})
	}

	database.DB.Create(&product)

	return c.JSON(product)
}

func GetProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var product models.Product

	product.Id = uint(id)

	database.DB.Find(&product)

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var product models.Product

	product = models.Product{}
	product.Id = uint(id)

	if err := c.BodyParser(&product); err != nil {
		return err
	}

	if product.Title == "" || product.Price == 0 || product.Description == "" {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "please input all the fields",
		})
	}

	database.DB.Model(&product).Updates(&product)

	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var product models.Product

	product = models.Product{}
	product.Id = uint(id)

	database.DB.Delete(&product)

	return nil
}
