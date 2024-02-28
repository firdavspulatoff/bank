package models

func (u *User) Create() error {
	return DB.Create(&u).Error
}

func (u *User) GetOne(id uint) error {
	return DB.Where("id = ?", id).Find(&u).Error
}

func (u *User) Update(id uint) error {
	return DB.Model(&User{}).Where("id = ?", id).Updates(u).Error
}

func (u *User) Delete(id uint) error {
	return DB.Delete(&User{}, id).Error
}
