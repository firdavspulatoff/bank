package db

import (
	"bank/models"
	"fmt"
)

func Migrate() {

	err := DB.AutoMigrate(&models.User{}, &models.Credit{}, &models.Debit{})
	if err != nil {
		panic(err)
	}

	fmt.Println("Success migrate")
}
