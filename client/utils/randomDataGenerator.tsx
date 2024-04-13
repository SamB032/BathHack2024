import { enteredData } from "./dataProps";

const min = 1;
const max = 500;

function generateRandomNumber(min: number, max: number):enteredData {
    const x = Math.floor(Math.random() * (max - min + 1));
    const y = Math.floor(Math.random() * (max - min + 1));
    
    return {
      boundedX: x,
      boundedY: y,
      colour: "grey",
      isNew: false,
    }
}

function getRandomData(){
    const randomNumbers: enteredData[] = [];
    for (let i = 0; i < 20; i++) {
      randomNumbers.push(generateRandomNumber(min, max));
    }

    return randomNumbers;
}

export default getRandomData;

