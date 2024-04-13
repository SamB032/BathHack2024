package main

import (
	"math"
	"math/rand"
)

const MAX_X float32 = 500
const MAX_Y float32 = 500
const KMEANS_NUMBER_OF_ITERATIONS = 50

// Generates a random centroid in a 500x500 range
func generateRandomCentroid() []float32 {
	var randomX float32 = rand.Float32() * MAX_X
	var randomY float32 = rand.Float32() * MAX_Y
	return []float32{randomX, randomY}
}

func euclideanDistance(x1 []float32, x2 []float32) float32 {
	var x float32 = x1[0] - x2[0]
	var y float32 = x1[1] - x2[1]

	return float32(math.Sqrt(float64((x * x) + (y * y))))
}

func calculateEcuideanDistances(centroids [][]float32, datapoints [][]float32, numberOfClusters int) [][]float32 {
	var distances [][]float32 = make([][]float32, len(datapoints))
	for i := range distances {
		distances[i] = make([]float32, numberOfClusters)
	}

	for i, point := range datapoints {
		for j, centroid := range centroids {
			distances[i][j] = euclideanDistance(point, centroid)
		}
	}

	return distances
}

// Function to find the index of the minimum value in a slice
func findMinIndex(arr []float32) int {
	minIndex := 0
	minValue := arr[0]

	for i, val := range arr {
		if val < minValue {
			minValue = val
			minIndex = i
		}
	}

	return minIndex
}

func isEqual2DArrays(arr1, arr2 [][]float32) bool {
	// Check if the lengths are different
	if len(arr1) != len(arr2) {
		return false
	}

	// Compare each row
	for i := range arr1 {
		// Check if the lengths of the rows are different
		if len(arr1[i]) != len(arr2[i]) {
			return false
		}
		// Compare each element in the row
		for j := range arr1[i] {
			if arr1[i][j] != arr2[i][j] {
				return false
			}
		}
	}

	return true
}

// Updated Kmeans function
func Kmeans(datapoints [][]float32, numberOfClusters int) ([]int, [][]float32) {
	// Initiate centroid distances randomly
	var centroids [][]float32 = make([][]float32, numberOfClusters)
	for i := 0; i < numberOfClusters; i++ {
		centroids[i] = generateRandomCentroid()
	}

	var minDistances []int

	for i := 0; i < KMEANS_NUMBER_OF_ITERATIONS; i++ {
		// Calculate euclidean distance for every point to each cluster
		var distances [][]float32 = calculateEcuideanDistances(centroids, datapoints, numberOfClusters)
		// Select the one with the min distance to centroid
		minDistances = make([]int, len(datapoints))

		for i, row := range distances {
			minDistances[i] = findMinIndex(row)
		}

		// Set centroid to the new mean
		var counts []float32 = make([]float32, numberOfClusters)
		var totals [][]float32 = make([][]float32, numberOfClusters)
		for i := 0; i < numberOfClusters; i++ {
			totals[i] = make([]float32, 2)
		}

		for i, minIndex := range minDistances {
			var point []float32 = datapoints[i]

			counts[minIndex]++
			totals[minIndex][0] += point[0]
			totals[minIndex][1] += point[1]
		}

		// Calculate the means
		var newClusterMeans [][]float32 = make([][]float32, numberOfClusters)
		for i := 0; i < numberOfClusters; i++ {
			newClusterMeans[i] = make([]float32, 2)
			if counts[i] > 0 {
				newClusterMeans[i][0] = totals[i][0] / counts[i]
				newClusterMeans[i][1] = totals[i][1] / counts[i]
			} else {
				// If the cluster is empty, randomly select a point as the new centroid
				newClusterMeans[i] = generateRandomCentroid()
			}
		}

		// Check if the means have converged
		if isEqual2DArrays(newClusterMeans, centroids) {
			break
		}

		// Update centroids for the next iteration
		centroids = newClusterMeans
	}

	return minDistances, centroids
}
