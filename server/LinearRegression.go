package main

const LINEAR_REGRESSION_MAX_ITERATIONS int = 20
const LINEAR_REGRESSION_ALPHA float32 = 0.0000005

// The function for the Linear Regression
func hypothesis(theta []float32, x float32) float32 {
	return theta[0]*x + theta[1]
}

// Compute graident for the parameterIndex
func computeGradient(datapoints [][]float32, parameters []float32, parameterIndex int) float32 {
	var sum float32
	for i := range datapoints {
		h := hypothesis(parameters, datapoints[i][0])
		diff := datapoints[i][1] - h

		if parameterIndex == 0 {
			sum += diff * datapoints[i][0]
		} else {
			sum += diff
		}
	}
	return LINEAR_REGRESSION_ALPHA * (1 / float32(len(datapoints))) * sum
}

func LinearRegression(datapoints [][]float32, numberOfDimensions int) []float32 {
	var parameters []float32 = []float32{1, 0}

	//Perform gradient descent interations
	for iter := 0; iter < LINEAR_REGRESSION_MAX_ITERATIONS; iter++ {
		//Calculate the new parameter
		for i := range parameters {
			parameters[i] += computeGradient(datapoints, parameters, i)
		}
	}
	return parameters
}
