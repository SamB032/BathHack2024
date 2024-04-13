package main

import (
	"fmt"
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

type CoordinateData struct {
	BoundedX float32 `json:"boundedX"`
	BoundedY float32 `json:"boundedY"`
	Colour   string  `json:"colour"`
	IsNew    bool    `json:"isNew"`
	Cluster  int     `json:"cluster"`
}

func extractCoordinates(coordinates []CoordinateData) [][]float32 {
	result := make([][]float32, len(coordinates))
	for i, coord := range coordinates {
		result[i] = []float32{coord.BoundedX, coord.BoundedY}
	}
	return result
}

func APILinearRegression(c *gin.Context) {
	type Coordinates struct {
		Coordinates []CoordinateData `json:"coordinates"`
	}

	var data Coordinates
	if err := c.BindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	var datapoints [][]float32 = extractCoordinates(data.Coordinates)
	var parameters []float32 = LinearRegression(datapoints, NUMBER_OF_DIMENSIONS)

	fmt.Println(parameters)

	c.JSON(http.StatusOK, gin.H{"parameters": parameters})
}

func APINearestNeighbours(c *gin.Context) {
	type Coordinates struct {
		Coordinates []CoordinateData `json:"coordinates"`
		KNeighbours int              `json:"neighboursToConsider"`
	}

	var data Coordinates
	if err := c.BindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	var newDatapoint CoordinateData
	var removeIndex int

	// Find and remove the first isNew value
	for i, point := range data.Coordinates {
		if point.IsNew {
			newDatapoint = data.Coordinates[i]
			removeIndex = i
			break
		}
	}

	// Remove the found point
	if removeIndex >= 0 && removeIndex < len(data.Coordinates) {
		data.Coordinates = append(data.Coordinates[:removeIndex], data.Coordinates[removeIndex+1:]...)
	}

	// Convert the coordinates to float32
	var datapoints [][]float32 = extractCoordinates(data.Coordinates)

	// Convert the datapoint to float32
	var datapoint []float32 = []float32{float32(newDatapoint.BoundedX), float32(newDatapoint.BoundedY)}
	var KNeighbours int = int(data.KNeighbours)

	fmt.Println(KNeighbours)

	newLocation, neighbours := Knn(datapoints, datapoint, KNeighbours)

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
