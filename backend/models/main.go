package models

import "gorm.io/gorm"

var (
	DB *gorm.DB
)

type (
	User struct {
		FirstName           string
		LastName            string
		MiddleName          string
		DateOfBirth         string
		Gender              string
		PassportSeria       string 
		PassportNumber      string `gorm:"unique:true"`
		IssuedBy            string
		DateIssued          string
		NumberId            string `gorm:"unique:true"`
		CityBirth           string
		City                string
		Address             string
		PhoneNumber         string `gorm:"unique:true"`
		HomePhoneNumber     string `gorm:"unique:true"`
		Email               string `gorm:"unique:true"`
		Work                string 
		Level               string
		CityRegistration    string
		AddressRegistration string
		FamilyStatus        string
		Citizenship         string
		Disability          string
		IsPensioner         bool
		Income              string
		IsMillitary         bool

		gorm.Model
	}

	Credit struct {
		StartDate string
		Type      string
		Value     string
		Amount    string
		UserId    uint
		User User

		gorm.Model
	}

	Debit struct {
		StartDate string
		Type      string
		Value     string
		Amount    string
		UserId    uint
		User User

		gorm.Model
	}
)
