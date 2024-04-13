import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/navbar'
import getRandomData from '../utils/randomDataGenerator';
import sendDataToAPI from '../utils/sendData';
import { enteredData } from "../utils/dataProps";
import LinearRegGraph from './components/linearRegGraph';

function App() {

  const [activePage, setActivePage] = useState("");
  const [pointCoordinates, setPointCoordinates] = useState<[number,number][]>(getRandomData())
  const [parameters, setParameters] = useState<[number,number]>([0,1])
  
  const dataToSend:enteredData = {
    coordinates: pointCoordinates,
    clusters: 4
  }
  
  useEffect(()=>{
    fetchParameters()
  },[])

  const fetchParameters = async() => {
    const parameterData = await sendDataToAPI(dataToSend);
    setParameters(parameterData);
  }

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };


  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
    }}>
      <Navbar setActivePage={handleSetActivePage} />
      <div style={{
        backgroundColor:"blue",
        width:"100vw",
        minHeight:"80vh",
      }}>
        {activePage && 
          <div>
            {activePage == "Linear Regression"&&<LinearRegGraph/>}
            {activePage == "K-means"&&<LinearRegGraph/>}
            {activePage == "Nearest Neighbour"&&<LinearRegGraph/>}
            {activePage} Page content goes here.
            </div>}
          <div>  </div>
      </div>
    </div>
  );
}

export default App
