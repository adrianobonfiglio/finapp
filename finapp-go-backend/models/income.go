package models

import "gorm.io/gorm"

type Income struct {
	gorm.Model
	Origin string  `json:"origin"`
	Amount float32 `json:"amount"`
}
