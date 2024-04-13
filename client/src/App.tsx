import {  useState } from 'react';
import './App.css'
import Navbar from './components/navbar'
import sendDataToAPI from '../utils/sendData';
import LinearRegGraph from './components/linearRegGraph';

function App() {

  const [activePage, setActivePage] = useState("");

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
            {activePage == "Linear Regression"&&<LinearRegGraph handleSendData={sendDataToAPI}/>}
            {activePage == "K-means"&&<LinearRegGraph handleSendData={sendDataToAPI}/>}
            {activePage == "Nearest Neighbour"&&<LinearRegGraph handleSendData={sendDataToAPI}/>}
            {activePage} Page content goes here.
            </div>}
          <div>  </div>
      </div>
    </div>
  );
}

export default App
