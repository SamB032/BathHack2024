export interface enteredData{
    boundedX: number,
    boundedY: number,
    colour: string,
    isNew: boolean,
    clusters? : number
}
export interface exportData{
    coordinates:enteredData[],
}