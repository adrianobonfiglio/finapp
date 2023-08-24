package income

import (
	"errors"
	"test/app/common"
	"test/app/models"
	"test/app/repository"
	"time"
)

type Income struct {
	models.Income
}

func getAll() []Income {
	return repository.GetAll[Income]()
}

func GetTotalIncomeByMonth(firstMonthDay, lastMonthDay time.Time) float32 {
	db := common.OpenDB()
	var totalIncome float32
	db.Model(&Income{}).Select("sum(amount)").Where("updated_at > ? and updated_at < ?", firstMonthDay, lastMonthDay).Find(&totalIncome)
	return totalIncome
}

func save(income Income) {
	db := common.OpenDB()
	db.Create(&income)
}

func findOne(id uint) (*Income, error) {
	var income Income
	db := common.OpenDB()

	income.ID = id

	db.First(&income)
	return &income, nil
}

func update(id uint, income Income) (*Income, error) {
	db := common.OpenDB()
	_, err := findOne(id)

	if err != nil {
		return nil, errors.New("error")
	}
	income.ID = id
	db.Save(&income)

	return &income, nil
}
