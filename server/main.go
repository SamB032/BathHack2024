package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "encoding/json"
)

const NUMBER_OF_DIMENSIONS int = 2

type APIneighbours struct {
	Index    int       `json:"index"`
	Distance float32   `json:"distance"`
	Point    []float32 `json:"point"`
}

func APILinearRegression(c *gin.Context) {
	type Coordinates struct {
		Coordinates [][]float32 `json:"coordinates"`
	}

	var data Coordinates
	if err := c.BindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	parameters := LinearRegression(data.Coordinates, NUMBER_OF_DIMENSIONS)
	c.JSON(http.StatusOK, gin.H{"parameters": parameters})
}

func APINearestNeighbours(c *gin.Context) {
	type RequestData struct {
		Coordinates [][]float64 `json:"coordinates"`
		KNeighbours int         `json:"KNeighbours"`
		Datapoint   []float64   `json:"datapoint"`
	}

	var requestData RequestData
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Convert the coordinates to float32
	var coordinates [][]float32
	for _, point := range requestData.Coordinates {
		var float32Point []float32
		for _, coord := range point {
			float32Point = append(float32Point, float32(coord))
		}
		coordinates = append(coordinates, float32Point)
	}

	// Convert the datapoint to float32
	var datapoint []float32
	for _, coord := range requestData.Datapoint {
		datapoint = append(datapoint, float32(coord))
	}

	// Convert the KNeighbours to int
	var KNeighbours int = int(requestData.KNeighbours)
	newLocation, neighbours := KMeans(coordinates, datapoint, KNeighbours)

	// Prepare neighbors data for JSON serialization
	neighboursData := make([]map[string]interface{}, len(neighbours))
	for i, neighbour := range neighbours {
		neighboursData[i] = map[string]interface{}{
			"index":    neighbour.index,
			"distance": neighbour.distance,
			"point":    neighbour.point,
		}
	}

	c.JSON(http.StatusOK, gin.H{"location": newLocation, "neighbours": neighboursData})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/LinearRegression", APILinearRegression)
	router.POST("/NearestNeighbours", APINearestNeighbours)

	router.Run("172.26.35.248:8000")

}
