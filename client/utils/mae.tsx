const MeanAbsoluteError = (x:number, y:number, parameters:[number,number]) => {
    const hypothesis = parameters[0] + parameters[1] * x
    const absoluteError = Math.abs(hypothesis - y)

    return absoluteError;
}

export default MeanAbsoluteError;