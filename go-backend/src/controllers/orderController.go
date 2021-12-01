package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"fmt"
	"net/http"
	"net/smtp"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/checkout/session"
)

func Orders(c *fiber.Ctx) error {
	var orders []models.Order

	database.DB.Preload("OrderItems").Find(&orders)

	for i, order := range orders {
		orders[i].FullName = order.Name()
		orders[i].Total = order.GetTotal()
	}

	return c.JSON(orders)
}

type CreateOrderRequest struct {
	Code      string
	FirstName string
	LastName  string
	Email     string
	Address   string
	Country   string
	City      string
	Zip       string
	Products  []map[string]int
}

func CreateOrder(c *fiber.Ctx) error {
	var request CreateOrderRequest

	if err := c.BodyParser(&request); err != nil {
		return err
	}

	link := models.Link{
		Code: request.Code,
	}

	database.DB.Preload("User").First(&link)

	if link.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Link!",
		})
	}

	order := models.Order{
		Code:            link.Code,
		UserId:          link.UserId,
		AmbassadorEmail: link.User.Email,
		FirstName:       request.FirstName,
		LastName:        request.LastName,
		Email:           request.Email,
		Address:         request.Address,
		Country:         request.Country,
		City:            request.City,
		Zip:             request.Zip,
	}

	tx := database.DB.Begin()
	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var lineItems []*stripe.CheckoutSessionLineItemParams

	for _, prod := range request.Products {
		product := models.Product{}
		product.Id = uint(prod["product_id"])
		database.DB.First(&product)

		total := product.Price * float64(prod["quantity"])

		item := models.OrderItem{
			OrderId:           order.Id,
			ProductTitle:      product.Title,
			Price:             product.Price,
			Quantity:          uint(prod["quantity"]),
			AmbassadorRevenue: 0.1 * total,
			AdminRevenue:      0.9 * total,
		}

		if err := tx.Create(&item).Error; err != nil {
			tx.Rollback()
			c.Status(http.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			Name:        stripe.String(product.Title),
			Description: stripe.String(product.Description),
			Images:      []*string{stripe.String(product.Image)},
			Amount:      stripe.Int64(100 * int64(product.Price)),
			Currency:    stripe.String("usd"),
			Quantity:    stripe.Int64(int64(prod["quantity"])),
		})
	}

	stripe.Key = "sk_test_51Hp4eGErCpQSuQA2UjLd1wZkyFKOQQyryZBDwCNK70WZFhWNm2UsXsrOTSGKmm85dNM7PMhxrmAV7DkDfMcmITgA00JCRTTLwi"

	params := stripe.CheckoutSessionParams{
		SuccessURL:         stripe.String("http://localhost:5000/success?source={CHECKOUT_SESSION_ID}"),
		CancelURL:          stripe.String("http://localhost:5000/error"),
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		LineItems:          lineItems,
	}

	source, err := session.New(&params)

	if err != nil {
		tx.Rollback()
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	order.TransactionId = source.ID

	if err := tx.Save(&order).Error; err != nil {
		tx.Rollback()
		c.Status(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	tx.Commit()

	return c.JSON(source)
}

func CompleteOrder(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	order := models.Order{}

	database.DB.Preload("OrderItems").First(&order, models.Order{
		TransactionId: data["source"],
	})

	if order.Id == 0 {
		c.Status(http.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Order not found",
		})
	}

	order.Complete = true

	database.DB.Save(&order)

	go func(order models.Order) {
		ambassadorRevenue := 0.0
		adminRevenue := 0.0

		for _, item := range order.OrderItems {
			ambassadorRevenue += item.AmbassadorRevenue
			adminRevenue += item.AdminRevenue
		}

		user := models.User{}
		user.Id = order.UserId
		database.DB.First(&user)

		database.Cache.ZIncrBy(context.Background(), "rankings", ambassadorRevenue, user.Name())
		adminMessage := []byte(fmt.Sprintf("Order #%d with the total of $%f", order.Id, adminRevenue))
		smtp.SendMail("host.docker.internal:1025", nil, "no-reply@rad.com", []string{"admin@rad.com"}, adminMessage)

		ambassadorMessage := []byte(fmt.Sprintf("You earned $%f from the link #%s", ambassadorRevenue, order.Code))
		smtp.SendMail("host.docker.internal:1025", nil, "no-reply@rad.com", []string{order.AmbassadorEmail}, ambassadorMessage)
	}(order)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
