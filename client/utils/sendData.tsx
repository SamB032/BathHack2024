import {  exportData } from "./dataProps";

const sendDataToAPILinear = async (data:exportData) => {
    console.log("sent",data)
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
        console.log('Returned:', returnedData);
        
        return returnedData;
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
}

const sendDataToAPINN = async (data:exportData) => {
    console.log("sent nn",data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch('http:///172.26.35.248:8000/NearestNeighbours', requestOptions);
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
const sendDataToAPIKMeans = async (data:exportData) => {
    console.log("sent",data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch('http:///172.26.35.248:8000/KMeans', requestOptions);
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
export default sendDataToAPILinear;
export {sendDataToAPIKMeans,sendDataToAPINN};
