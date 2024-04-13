package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func APILinearRegression(c *gin.Context) {
	datapoints := [][]float32{
		{2.0, 2.0},
		{4.0, 4.0},
		{6.0, 6.0},
	}

	parameters := LinearRegression(datapoints, 2)
		
	c.JSON(http.StatusOK, gin.H{"parameters": parameters})
}

func main() {
	router := gin.Default()

	router.GET("/", APILinearRegression)

	router.Run("localhost:8000")

}