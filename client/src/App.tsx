import './App.css'
import {  useEffect, useState } from 'react';
import { sendDataToAPIKMeans, sendDataToAPINN } from '../utils/sendData';
import Navbar from './components/navbar'
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
  const [kToConsider,setKToConsider]= useState(0);
  const [distances, setDistances] = useState<number []>([])
  const [videoToDisplay, setVideoToDisplay] = useState("");
  const [howToUseText, setHowToUseText] = useState("");
  const [modelExplaination, setModelExplaination] = useState("");
  
  useEffect(()=>{
    switch (activePage){
      case "Linear Regression":
        setHowToUseText(`        
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
        <strong>Point Selection: </strong> Click anywhere on the plot to insert a new data point.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
        <strong>Set the type of the desired error function:</strong> The best-fit line will adjust accordingly to minimize the error on the current data points. The value is also displayed.
        </div>`);
        setModelExplaination("Linear regression is a statistical method used to model the relationship between a dependent variable and one or more independent variables. It assumes a linear relationship between the variables, aiming to find the best-fitting line that minimizes the differences between the observed and predicted values. Once the model is trained on a dataset, it can be used to predict the dependent variable's value based on new input values of the independent variables.");
        setVideoToDisplay("https://www.youtube.com/embed/CtsRRUddV2s")
        break;
      
      case "Nearest Neighbour":
        setHowToUseText(`
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Point Selection: </strong> Click anywhere on the plot to insert a new data point.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Draw lines to K nearest neighbors:</strong> When a new data point is added, the system will draw lines connecting it to its K nearest neighbors and display their distances.
        </div>
      `);
        setModelExplaination("K Nearest Neighbors is a simple and intuitive machine learning algorithm used for classification and regression tasks. In KNN, the prediction for a new data point is based on the majority class or average value of its k nearest neighbors in the feature space. The nearest neighbors are determined based on a distance metric, commonly Euclidean distance. KNN does not involve explicit training; instead, it stores the entire training dataset and calculates distances at prediction time.");
        setVideoToDisplay("https://www.youtube.com/embed/0p0o5cmgLdE")
        break;
      
      case "K-means":
        setHowToUseText(`
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Select the Algorithm:</strong> Choose the algorithm you want to visualize from the dropdown menu. For example, select "K-means" to visualize the K-means clustering algorithm.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Set Parameters:</strong> If applicable, set any parameters required by the algorithm. For K-means, you can set the number of clusters you want the algorithm to identify.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Interact with the Visualization:</strong> For K-means clustering, click on the data points to interactively assign them to different clusters. As you click on a point, the visualization will update in real-time to show which cluster the data point belongs to. The colors of the points will change dynamically to represent the clustering process.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left">
          <strong>Observe Cluster Formation:</strong> Watch as the algorithm dynamically updates the clusters based on your interactions. The visualization will provide insights into how the clusters are forming and how the data points are grouped together.
        </div>
        <div style="margin-bottom: 10px; font-size:1.3em; text-align:left ">
          <strong>Experiment and Learn:</strong> Feel free to experiment with different parameter settings and interaction techniques to gain a deeper understanding of how the algorithm works and how it can be applied to your data.
        </div>
      `);
        setModelExplaination("K-means clustering is an unsupervised machine learning algorithm used to partition a dataset into a predetermined number of clusters (k). The algorithm iteratively assigns each data point to the nearest cluster centroid and recalculates the centroids based on the mean of the data points in each cluster. This process continues until the centroids stabilize or a specified number of iterations is reached. K-means aims to minimize the intra-cluster variance, resulting in compact and well-separated clusters. It is widely used for data exploration, pattern recognition, and segmentation tasks.");
        setVideoToDisplay("https://www.youtube.com/embed/R2e3Ls9H_fc")
        break;
    } 
  },[activePage])

  const renderHTML = (html: string) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };


  const getKNNDistances = (distances:number[]) => {
    setDistances(distances)
  }
  
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
            <LinearRegParams title='K Means' modelType='k-means' ></LinearRegParams>
           </div>
            <div>
            <KMeansGraph handleSendData={sendDataToAPIKMeans}></KMeansGraph>
          </div>
           
           <div>
            <LinearRegOutputs title={'?'} value={'0.0012'}  modelType='k-means' ></LinearRegOutputs>
           </div>

           </div>
            }
            {activePage == "Nearest Neighbour"&&
             <div style={{display:"flex",flexDirection:"row"}}>
          
              <div style={{marginLeft:'200px'}}>
                <LinearRegParams title='KNN' modelType='KNN' callback={setKToConsider} ></LinearRegParams>
              </div>
              
              <div>
                <NNGraph handleSendData={sendDataToAPINN} kToConsider={kToConsider} getDistance={getKNNDistances}></NNGraph>
              </div>

              <div>
                <LinearRegOutputs title={'Distances'} value={distances} modelType='KNN'></LinearRegOutputs>
              </div>
          </div>
            }
            </div>:<div style={{margin:60,fontSize:20}}>
             Please Select A Model
              </div>}
          <div>  </div>
      </div>
      
      <div style={{ textAlign: "center" }}>
      <h1>I'm Confused</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{marginRight:"20%", marginLeft:"20%"}}>
          {/* <h3 style={{ margin: "10px 0" }}> I'm confused what is machine learning?</h3> */}
          
          <h2 style={{ margin: "10px 0" }}>How do I use this?</h2>
          {renderHTML(howToUseText)}
          
          <h2 style={{ margin: "5px 0", fontStyle: "italic" }}>Model Explaination</h2>
          <p style={{fontSize:"1.3em"}}> {modelExplaination} </p>
          
          <h2 style={{ margin: "10px 0" }}>I'm still confused?</h2>
          <div style={{ position: "relative", width: "1200px", paddingBottom: "56.25%" }}>
            <iframe src={videoToDisplay} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}></iframe>
          </div>
        </div>
  </div>
</div>



       <div> <p className="desc-text-inner">Explanation</p> </div>
      <div style={{width:'100vw', height:'500px', backgroundColor:'rgba(127, 150, 151, 0.14)',borderTop:'5px solid black',}}>
      BathHack2024
      </div>
    </div>
  );
}

export default App
