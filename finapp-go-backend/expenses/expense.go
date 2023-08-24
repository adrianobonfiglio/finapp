package expenses

import (
	"errors"
	"log"
	"test/app/common"
	"test/app/models"
	"time"
)

type Expense struct {
	models.Expense
}

func getAll() []Expense {
	var expenses []Expense
	db := common.OpenDB()
	db.Preload("Payments").Find(&expenses)

	return expenses
}

func save(expense Expense) {
	db := common.OpenDB()
	db.Create(&expense)
}

func update(id uint, expense Expense) (*Expense, error) {
	db := common.OpenDB()
	_, err := findOne(id)

	if err != nil {
		return nil, errors.New("error")
	}
	expense.ID = id
	db.Save(&expense)

	return &expense, nil
}

func getExepensesPaymentsByMonth(month int, year int) []Expense {
	firstMonthDay := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	lastMonthDay := firstMonthDay.AddDate(0, 1, -1)
	var expenses []Expense
	db := common.OpenDB()

	db.Preload("Payments", db.Where("created_at > ? AND created_at < ?", firstMonthDay, lastMonthDay)).Find(&expenses, db.Where("created_at < ?", lastMonthDay))

	return expenses
}

func findOne(id uint) (*Expense, error) {
	var expense Expense
	db := common.OpenDB()

	expense.ID = id

	db.Preload("Payments").First(&expense)
	return &expense, nil
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
