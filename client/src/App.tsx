import {  useState } from 'react';
import './App.css'
import Navbar from './components/navbar'
import { sendDataToAPIKMeans, sendDataToAPINN } from '../utils/sendData';
import LinearRegGraph from './components/linearRegGraph';
import LinearRegOutputs from './components/linearRegOuput';
import LinearRegParams from './components/linearRegParams';
import KMeansGraph from './components/kMeansGraph';
import NNGraph from './components/nnGraph';
import sendDataToAPILinear from '../utils/sendData';


function App() {

  const [activePage, setActivePage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorValue, setErrorValue] = useState(0);

  const getErrorType = (errorType: string) => {
    setErrorType(errorType)
  }

  const getErrorValue = (errorValue:number) => {
    setErrorValue(errorValue);
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
        width:"100vw",
        minHeight:"80vh",
        display:'flex',
        justifyContent:'center',
      }}>

        {activePage ? 
          <div className="container">
            {activePage == "Linear Regression"&&
            <div style={{display:"flex",flexDirection:"row"}}>
              <div style={{marginLeft:'300px'}}>
                <LinearRegParams title='Select Error Loss' modelType='LRM' callback={getErrorType} ></LinearRegParams>
              </div>
              <div>
                <LinearRegGraph errorMethod={errorType} handleErrorValue={getErrorValue} handleSendData={sendDataToAPILinear}/>
              </div>
              <div>
                <LinearRegOutputs title={errorType}  value={errorValue}></LinearRegOutputs>
              </div>
              
            </div>
            }
            {activePage == "K-means"&&
              <div style={{display:"flex",
              flexDirection:"row"}}>
           <div style={{marginLeft:'300px'}}>
            <LinearRegParams title='K Means' modelType='k-means' ></LinearRegParams>
           </div>
            <div>
            <KMeansGraph handleSendData={sendDataToAPIKMeans}></KMeansGraph>
          </div>
           
           <div>
            <LinearRegOutputs title={'MSE'} value={'0.0012'}></LinearRegOutputs>
           </div>

           </div>
            }
            {activePage == "Nearest Neighbour"&&
             <div style={{display:"flex",flexDirection:"row"}}>
          
              <div style={{marginLeft:'300px'}}>
                <LinearRegParams title='KNN' modelType='KNN' ></LinearRegParams>
              </div>
              
              <div>
                <NNGraph handleSendData={sendDataToAPINN}></NNGraph>
              </div>

              <div>
                <LinearRegOutputs title={'MSE'} value={'0.0012'}></LinearRegOutputs>
              </div>
          </div>
            }
            </div>:<div style={{margin:60,fontSize:20}}>
             Please Select A Model
              </div>}
          <div>  </div>
      </div>
    </div>
  );
}

export default App
