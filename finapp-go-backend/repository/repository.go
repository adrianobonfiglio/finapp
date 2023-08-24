package repository

import "test/app/common"

func GetAll[T comparable]() []T {
	var entities []T
	db := common.OpenDB()
	db.Find(&entities)

	return entities
}
