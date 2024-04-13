package main

import "sync"

const LINEAR_REGRESSION_MAX_ITERATIONS int = 100
const LINEAR_REGRESSION_ALPHA float32 = 0.0005

// The function for the Linear Regression
func hypothesis(theta []float32, x float32) float32 {
	return theta[0] + theta[1] * x
}

func computeGradient(datapoints [][]float32, parameters []float32, gradientChan chan <- []float32, wg *sync.WaitGroup, parameterIndex int) {
	defer wg.Done()

	// Initialize gradient
	gradient := make([]float32, len(parameters))

	// Compute gradient for the specified parameter
	var sum float32
	for i := range datapoints {
		h := hypothesis(parameters, datapoints[i][0]) // Compute hypothesis using all parameters
		diff := h - datapoints[i][1]                  // Compute difference between actual and predicted
		
		if parameterIndex == 0 {
			sum += diff
		} else {
			sum += diff * datapoints[i][0]
		}
	}
	gradient[parameterIndex] = sum
	gradientChan <- gradient
}

func LinearRegression(datapoints [][]float32, numberOfDimensions int) []float32 {
	var parameters []float32 = []float32{0, 1}
	
	// Initialize parameters with 1
	for i := range parameters {
		parameters[i] = 1.0
	}

	// Perform gradient descent iterations concurrently
	for iter := 0; iter < LINEAR_REGRESSION_MAX_ITERATIONS; iter++ {
		gradientChan := make(chan []float32, len(parameters)) // Channel to receive gradients from goroutines
		var wg sync.WaitGroup

		// Start the go routines concurrently to compute gradients for each parameter
		for j := 0; j < numberOfDimensions; j++ {
			wg.Add(1)
			go computeGradient(datapoints, parameters, gradientChan, &wg, j)
		}

		// Start a goroutine to receive data from the channel and update parameters
		go func() {
			for gradient := range gradientChan {
				// Update parameters using the computed gradients
				for j := range parameters {
					parameters[j] -= LINEAR_REGRESSION_ALPHA * (1 / float32(len(datapoints))) * gradient[j] // Update other parameters
				}
			}
		}()

		wg.Wait()
		close(gradientChan)
	}

	return parameters
}
