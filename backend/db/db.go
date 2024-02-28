package db

import (
	"bank/models"
	"context"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func init() {
	host := "localhost"
	port := "5432"
	user := "postgres"
	// password := "Fird@vs2002"
	password := "niyozbek"
	dbname := "bank_db"

	// getting db for gorm
	dsn := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable TimeZone=Asia/Shanghai", user, password, host, port, dbname)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println(err)
	}
	db.Debug()
	ctx := context.Background()
	DB = db.WithContext(ctx)
	models.DB = DB
	Migrate()
}
