package models

func (u *Credit) Create() error {
	return DB.Create(&u).Error
}

func (u *Credit) GetOne(id uint) error {
	return DB.Where("id = ?", id).Find(&u).Error
}

func (u *Credit) Update(id uint) error {
	return DB.Model(&Credit{}).Where("id = ?", id).Updates(u).Error
}

func (u *Credit) Delete(id uint) error {
	return DB.Delete(&Credit{}, id).Error
}
