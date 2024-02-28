package models

func (u *Debit) Create() error {
	return DB.Create(&u).Error
}

func (u *Debit) GetOne(id uint) error {
	return DB.Where("id = ?", id).Find(&u).Error
}

func (u *Debit) Update(id uint) error {
	return DB.Model(&Debit{}).Where("id = ?", id).Updates(u).Error
}

func (u *Debit) Delete(id uint) error {
	return DB.Delete(&Debit{}, id).Error
}
