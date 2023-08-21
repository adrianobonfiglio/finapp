package models

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	ExpenseType string    `json:"type"`
	Description string    `json:"description"`
	Value       float32   `json:"value"`
	DueDay      uint      `json:"dueDay"`
	StartFrom   time.Time `json:"startFrom"`
	Payments    []Payment `json:"payments" gorm:"foreignKey:ExpenseID"`
}
