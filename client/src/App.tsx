import {  useEffect, useState } from 'react';
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
  const [kToConsider,setKToConsider]= useState(2);
  const [clusters,setClusters]= useState(2);
  const getErrorType = (errorType: string) => {
    setErrorType(errorType)
  }

  const getErrorValue = (errorValue:number) => {
    setErrorValue(errorValue);
  }

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };

  useEffect(()=>{
console.log("clusters updated",clusters);
  },[clusters])

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
    }}>
    <div style={{width:'100vw',height:'100px',marginTop:'-20px',backgroundColor:'rgba(0,100,100,0.5)',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{marginBottom:'-20px',fontWeight:'bold',fontSize:25,color:'white'}}>Experiment On Machine Learning Models Direct From Your Browser</div>
      </div>
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
              <div style={{marginLeft:'200px'}}>
                <LinearRegParams title='Select Error Loss' modelType='LRM' callback={getErrorType} ></LinearRegParams>
              </div>
              <div>
                <LinearRegGraph errorMethod={errorType} handleErrorValue={getErrorValue} handleSendData={sendDataToAPILinear}/>
              </div>
              <div>
                <LinearRegOutputs title={errorType}  value={errorValue} modelType='LRM'></LinearRegOutputs>
              </div>
              
            </div>
            }
            {activePage == "K-means"&&
              <div style={{display:"flex",
              flexDirection:"row"}}>
           <div style={{marginLeft:'200px'}}>
            <LinearRegParams title='K Means' modelType='k-means'callback={setClusters} ></LinearRegParams>
           </div>
            <div>
            <KMeansGraph handleSendData={sendDataToAPIKMeans} clusters={clusters}></KMeansGraph>
          </div>
           
           <div>
            <LinearRegOutputs title={'?'} value={''}  modelType='k-means' ></LinearRegOutputs>
           </div>

           </div>
            }
            {activePage == "Nearest Neighbour"&&
             <div style={{display:"flex",flexDirection:"row"}}>
          
              <div style={{marginLeft:'200px'}}>
                <LinearRegParams title='KNN' modelType='KNN' callback={setKToConsider} ></LinearRegParams>
              </div>
              
              <div>
                <NNGraph handleSendData={sendDataToAPINN} kToConsider={kToConsider}></NNGraph>
              </div>

              <div>
                <LinearRegOutputs title={'Distances'} value={''} modelType='KNN'></LinearRegOutputs>
              </div>
          </div>
            }
            </div>:<div style={{margin:60,fontSize:20}}>
             Please Select A Model
              </div>}
          <div>  </div>
      </div>
      <div style={{width:'100vw',height:'500px', backgroundColor:'rgba(65,100,100,0.25)',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <p className="desc-text"> I'm confused what is machine learning ?</p>
      <p className="desc-text-inner">Explanation</p>
      <p className="desc-text">How do I use this ?</p>
      <p className="desc-text-inner">Explanation</p>
      <p className="desc-text"> Where can I see the code ?</p>
      <p className="desc-text-inner">Explanation</p>
      <p className="desc-text"> I'm still confused ?</p>
      <p className="desc-text-inner">Explanation</p>
      </div>
      <div style={{width:'100vw',height:'500px', backgroundColor:'rgba(127, 150, 151, 0.14)',borderTop:'5px solid black',}}>
      BathHack2024
      </div>
    </div>
  );
}

export default App
