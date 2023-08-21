package models

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	PaymentType string    `json:"type"`
	Value       float32   `json:"value"`
	PaymentDate time.Time `json:"paymentDate"`
	ExpenseID   uint
}
