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

func setCreditRoutes(r *gin.Engine) {
	r.POST("/credit/create", CreateCredit)
	r.GET("/credit/all", GetAllCredits)
	r.GET("/credit/:id", GetOneCredit)
	r.PATCH("/credit/:id", UpdateCredit)
	r.DELETE("/credit/:id", DeleteCredit)

}

// create integration to admin panel
func CreateCredit(c *gin.Context) {
	credit := models.Credit{}

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = json.Unmarshal(bodyBytes, &credit)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	// create ingration
	err = credit.Create()
	lvn.GinErr(c, 400, err, "credit create error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    credit,
	})

}

func GetAllCredits(c *gin.Context) {
	var credits []models.Credit

	err := db.DB.Preload("User").Find(&credits).Error
	lvn.GinErr(c, 400, err, "get credits error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    credits,
	})

}

func GetOneCredit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	credit := models.Credit{}
	err = credit.GetOne(uint(id))
	lvn.GinErr(c, 400, err, "error in get credit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    credit,
	})
}

func UpdateCredit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	credit := models.Credit{}
	err = json.Unmarshal(bodyBytes, &credit)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = credit.Update(uint(id))
	lvn.GinErr(c, 400, err, "error in update credit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    credit,
	})
}

func DeleteCredit(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	credit := models.Credit{}

	err = credit.Delete(uint(id))
	lvn.GinErr(c, 400, err, "error in update credit")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    "",
	})
}
