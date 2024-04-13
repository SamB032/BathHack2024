import { enteredData } from "./dataProps";

const sendDataToAPI = async (data:enteredData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch('http://172.26.35.248:8000/LinearRegression', requestOptions);
        if (!response.ok) {
            throw new Error('Failed to send data to API');
        }
        const returnedData = await response.json();
        console.log('Data sent successfully:', returnedData);
        
        return returnedData;
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
}

export default sendDataToAPI;