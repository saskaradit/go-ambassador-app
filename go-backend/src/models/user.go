package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	Model
	FirstName    string   `json:"first_name"`
	LastName     string   `json:"last_name"`
	Email        string   `json:"email" gorm:"unique"`
	Password     []byte   `json:"-"`
	IsAmbassador bool     `json:"-"`
	Revenue      *float64 `json:"revenue,omitempty" gorm:"-"`
}

func (u *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 10)
	u.Password = hashedPassword
}

func (u *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(u.Password, []byte(password))
}

func (u *User) Name() string {
	return u.FirstName + " " + u.LastName
}

type Admin User

type Ambassador User

func (a *Ambassador) CalculateRevenue(db *gorm.DB) {
	var orders []Order

	db.Preload("OrderItems").Find(&orders, &Order{
		UserId:   a.Id,
		Complete: true,
	})
	var revenue float64
	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AmbassadorRevenue
		}
	}

	a.Revenue = &revenue
}

func (a *Admin) CalculateRevenue(db *gorm.DB) {
	var orders []Order

	db.Preload("OrderItems").Find(&orders, &Order{
		UserId:   a.Id,
		Complete: true,
	})
	var revenue float64
	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AdminRevenue
		}
	}

	a.Revenue = &revenue
}
