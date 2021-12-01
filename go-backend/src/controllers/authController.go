package controllers

import (
	"ambassador/src/database"
	"ambassador/src/middlewares"
	"ambassador/src/models"
	"net/http"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["first_name"] == "" || data["last_name"] == "" || data["email"] == "" || data["password"] == "" {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "please input all the fields",
		})
	}
	if data["password"] != data["password_confirm"] {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	user := models.User{
		FirstName:    data["first_name"],
		LastName:     data["last_name"],
		Email:        data["email"],
		IsAmbassador: strings.Contains(c.Path(), "api/v1/ambassador"),
	}
	user.SetPassword(data["password"])

	database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect passwword or email",
		})
	}

	if err := user.ComparePassword(data["password"]); err != nil {
		return c.JSON(fiber.Map{
			"message": "Incorrect passwword or email",
		})
	}

	isAmbassador := strings.Contains(c.Path(), "/api/v1/ambassador")
	var scope string
	if isAmbassador {
		scope = "ambassador"
	} else {
		scope = "admin"
	}

	if !isAmbassador && user.IsAmbassador {
		c.Status(http.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	token, err := middlewares.GenerateJwt(user.Id, scope)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	var user models.User

	database.DB.Where("id = ?", id).First(&user)

	if strings.Contains(c.Path(), "/api/v1/ambassador") {
		ambassador := models.Ambassador(user)
		ambassador.CalculateRevenue(database.DB)
		return c.JSON(ambassador)
	}

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func UpdateInfo(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := middlewares.GetUserId(c)

	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
	}
	user.Id = id

	database.DB.Model(&user).Updates((&user))

	return c.JSON(user)
}

func UpdatePassword(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	id, _ := middlewares.GetUserId(c)
	user := models.User{}
	user.Id = id
	user.SetPassword(data["password"])

	database.DB.Model(&user).Updates((&user))

	return c.JSON(fiber.Map{
		"message": "password changed",
	})
}
