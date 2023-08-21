package users

import (
	"crypto/sha256"
	"encoding/hex"
	"test/app/common"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name  string `json:"name"`
	Email string `json:"email"`
	Pass  string `json:"pass"`
}

func CreateBaseUsers() {
	db := common.OpenDB()
	input := "test123"
	hashStr := hash(input)

	user := User{Name: "Adriano Bonfiglio", Email: "adrianobonfiglio@gmail.com", Pass: hashStr}
	existUser := findUserPass(user.Email, input)
	if (existUser == User{}) {
		db.Create(&user)
	}
	user = User{Name: "Fernanda Klauck", Email: "feklauck@gmail.com", Pass: hashStr}
	existUser = findUserPass(user.Email, input)
	if (existUser == User{}) {
		db.Create(&user)
	}
}

func findUserPass(email string, pass string) User {
	db := common.OpenDB()
	var user User
	pass = hash(pass)
	db.Where("email = ? and pass = ?", email, pass).First(&user)
	return user
}

func hash(pass string) string {
	hash := sha256.Sum256([]byte(pass))
	return hex.EncodeToString(hash[:])
}
