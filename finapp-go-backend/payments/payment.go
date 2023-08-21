package payments

import (
	"errors"
	"log"
	"test/app/common"
	"test/app/models"
)

type Payment struct {
	models.Payment
}

func getAll() []Payment {
	var payments []Payment
	db := common.OpenDB()
	db.Find(&payments)

	return payments
}

func save(payment Payment) {
	db := common.OpenDB()
	db.Create(&payment)
}

func update(id uint, payment Payment) (*Payment, error) {
	db := common.OpenDB()
	_, err := findOne(id)

	if err != nil {
		return nil, errors.New("error")
	}
	payment.ID = id
	db.Save(&payment)

	return &payment, nil
}

func findOne(id uint) (*Payment, error) {
	var payment Payment
	db := common.OpenDB()

	payment.ID = id

	db.First(&payment)
	return &payment, nil
}

func delete(id string) error {
	sql := "DELETE FROM EXPENSES WHERE ID = ?"

	db, err := common.GetDB()
	if err != nil {
		log.Println("erro db")
		return err
	}

	_, err = db.Exec(sql, id)

	db.Close()
	return err

}
