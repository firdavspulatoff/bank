package webserver

import (
	"bank/db"
	"bank/models"
	"encoding/json"
	"net/http"
	"strconv"

	lvn "github.com/Lavina-Tech-LLC/lavinagopackage/v2"
	"github.com/gin-gonic/gin"
)

func setDebitRoutes(r *gin.Engine) {
	r.POST("/debit/create", CreateDebit)
	r.GET("/debit/all", GetAllDebits)
	r.GET("/debit/:id", GetOneDebit)
	r.PATCH("/debit/:id", UpdateDebit)
	r.DELETE("/debit/:id", DeleteDebit)


}

// create integration to admin panel
func CreateDebit(c *gin.Context) {
	debit := models.Debit{}

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = json.Unmarshal(bodyBytes, &debit)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	// create ingration
	err = debit.Create()
	lvn.GinErr(c, 400, err, "debit create error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    debit,
	})

}

func GetAllDebits(c *gin.Context) {
	var debits []models.Debit

	err := db.DB.Preload("User").Find(&debits).Error
	lvn.GinErr(c, 400, err, "get debit error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    debits,
	})

}

func GetOneDebit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	debit := models.Debit{}
	err = debit.GetOne(uint(id))
	lvn.GinErr(c, 400, err, "error in get debit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    debit,
	})
}

func UpdateDebit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	debit := models.Debit{}
	err = json.Unmarshal(bodyBytes, &debit)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = debit.Update(uint(id))
	lvn.GinErr(c, 400, err, "error in update debit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    debit,
	})
}

func DeleteDebit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	debit := models.Debit{}

	err = debit.Delete(uint(id))
	lvn.GinErr(c, 400, err, "error in update debit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    "",
	})
}
