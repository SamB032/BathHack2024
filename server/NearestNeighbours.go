package main

import (
	"math"
	"sync"
)

type neighbours struct {
	index    int
	distance float32
	point    []float32
}

// Calculates the euclidean distance between the two points
func EuclideanDistance(x1 []float32, x2 []float32) float32 {
	var deltaX float32 = x1[0] - x2[0]
	var deltaY float32 = x1[1] - x2[1]
	return float32(math.Sqrt(float64(deltaX*deltaX + deltaY*deltaY)))
}

func insertionSort(datapoints []neighbours) []neighbours {
	for i := 1; i < len(datapoints); i++ {
		key := datapoints[i]
		j := i - 1
		for j >= 0 && datapoints[j].distance > key.distance {
			datapoints[j+1] = datapoints[j]
			j = j - 1
		}
		datapoints[j+1] = key
	}
	return datapoints
}

func Knn(datapoints [][]float32, newDatapoint []float32, numberOfNeighbours int) ([]float32, []neighbours) {
	var wg sync.WaitGroup
	var distances []neighbours = make([]neighbours, len(datapoints))

	// Calculate the Euclidean Distance from Each datapoint and its
	for i, point := range datapoints {
		wg.Add(1)
		go func(i int, point []float32) {
			defer wg.Done()
			distance := EuclideanDistance(point, newDatapoint)
			distances[i] = neighbours{
				index:    i,
				distance: distance,
				point:    point,
			}
		}(i, point)
	}
	wg.Wait()

	// Remove the distances that are not the nearest K-neighbours
	var nearestNeighbours []neighbours = insertionSort(distances)

	// Slice to retain K nearest neighbours
	var numberOfItems float32 = float32(len(distances))

	if len(distances) > numberOfNeighbours {
		nearestNeighbours = distances[:numberOfNeighbours]
		numberOfItems = float32(numberOfNeighbours)
	}

	// Calculate the sum of the x and the y
	var sumX float32 = 0
	var sumY float32 = 0

	for _, neighbour := range nearestNeighbours {
		sumX += neighbour.point[0]
		sumY += neighbour.point[1]
	}

	// Calcualte the average and store the value in the array
	var newLocation = []float32{sumX / numberOfItems, sumY / numberOfItems}

	return newLocation, nearestNeighbours
}
