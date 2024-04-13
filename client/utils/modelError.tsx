export const absoluteErrorDistance = (x:number, y:number, parameters:[number,number]) => {
    const hypothesis = parameters[0] * x + parameters[1]
    const absoluteError = Math.abs(hypothesis - y)

    return absoluteError;
}

const meanAbsoluteError = (dataPoints: [number, number][], parameters: [number, number]) => {
    let total = 0;
    dataPoints.forEach((singlePoint) => {
        total += absoluteErrorDistance(singlePoint[0], singlePoint[1], parameters);
    });

    const mean = total / dataPoints.length;

    return mean;
};


///////////////////////////////////////

const meanSquaredError = (dataPoints: [number, number][], parameters: [number, number]) => {
    let total = 0;
    dataPoints.forEach((point) => {
        const error = (point[1] - (parameters[1] + parameters[0] * point[0])) ** 2;
        total += error;
    });

    const mean = total / dataPoints.length;

    return mean;
};

export const getAllErrors = (dataPoints: [number, number][], parameters: [number, number]) => {
    const allErrors = {
        meanAbsoluteError: meanAbsoluteError(dataPoints, parameters),
        meanSquaredError: meanSquaredError(dataPoints, parameters), 
    }

    return allErrors;
}







// export const calculateRSquared = (dataPoints: [number, number][], parameters: [number, number]): number => {
    
//     // Calculate mean of the dependent variable (y)
//     const meanY: number = dataPoints.reduce((sum: number, [x, y]) => sum + y, 0) / dataPoints.length;

//     // Calculate Total Sum of Squares (TSS)
//     const TSS: number = dataPoints.reduce((sum: number, [x, y]) => sum + Math.pow(y - meanY, 2), 0);

//     // Calculate Residual Sum of Squares (RSS)
//     const RSS: number = dataPoints.reduce((sum: number, [x, y]) => {
//         const predictedY: number = parameters[0] + parameters[1] * x;
//         return sum + Math.pow(y - predictedY, 2);
//     }, 0);

//     // Calculate R-squared
//     const rSquared: number = 1 - (RSS / TSS);

//     return rSquared;
// };


