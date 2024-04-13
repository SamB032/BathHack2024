const min = 1;
const max = 100;

function generateRandomNumber(min: number, max: number):[number, number] {
    const x = Math.floor(Math.random() * (max - min + 1));
    const y = Math.floor(Math.random() * (max - min + 1));
    
    return [x,y]
}

function getRandomData(){
    const randomNumbers: [number, number][] = [];
    for (let i = 0; i < 20; i++) {
      randomNumbers.push(generateRandomNumber(min, max));
    }

    return randomNumbers;
}

export default getRandomData;

