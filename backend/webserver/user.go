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

func setUserRoutes(r *gin.Engine) {
	r.POST("/user/create", CreateUser)
	r.GET("/user/all", GetAllUsers)
	r.GET("/user/:id", GetOneUser)
	r.PATCH("/user/:id", UpdateUser)
	r.DELETE("/user/:id", DeleteUser)
}

// create integration to admin panel
func CreateUser(c *gin.Context) {
	user := models.User{}

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = json.Unmarshal(bodyBytes, &user)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	// create ingration
	err = user.Create()
	lvn.GinErr(c, 400, err, "integration create error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    user,
	})

}

func GetAllUsers(c *gin.Context) {
	var users []models.User

	err := db.DB.Find(&users).Error
	lvn.GinErr(c, 400, err, "get users error")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    users,
	})

}

func GetOneUser(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	user := models.User{}
	err = user.GetOne(uint(id))
	lvn.GinErr(c, 400, err, "error in get user")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    user,
	})
}

func UpdateUser(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	bodyBytes, err := c.GetRawData()
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	user := models.User{}
	err = json.Unmarshal(bodyBytes, &user)
	lvn.GinErr(c, 400, err, "Unable to bind JSON")

	err = user.Update(uint(id))
	lvn.GinErr(c, 400, err, "error in update integration")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    user,
	})
}

func DeleteUser(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	lvn.GinErr(c, 400, err, "id should be required")

	user := models.User{}

	err = user.Delete(uint(id))
	lvn.GinErr(c, 400, err, "error in update user")

	c.JSON(http.StatusOK, gin.H{
		"message": "successs",
		"isOk":    true,
		"data":    "",
	})
}
