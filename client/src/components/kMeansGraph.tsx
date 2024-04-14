
import "./graph.css";
import ClickableArea from "./clickableArea";
import {  useEffect, useRef, useState } from "react";
import RandomizeButton from "./randomButton";
import getRandomData from "../../utils/randomDataGenerator";
import { exportData, enteredData as pointData} from "../../utils/dataProps" ;
interface LinearRegProps{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
handleSendData:(data: exportData) => Promise<any>;
clusters:number;
}
interface lineData{
  xMax:number;
  slope:number;
  intercept:number;
}
export default function KMeansRegGraph({handleSendData,clusters}:LinearRegProps){
    const canvasRef = useRef(null);
    const [reDrawFlag,setReDrawFlag] = useState(false);
    const [randomClicked,setRandomClicked]=useState(false);
    const [clearedClicked,setClearedClicked]=useState(false);
    const [lineData,setLineData]=useState<lineData>()
    const [fetchFlag,setFetchFlag]=useState(false);
    const [points, setPoints] = useState<pointData[]>([]);
    const gridTicks=[500,450,400,350,300,250,200,150,100,50,0]
    const gridTicksX=[0,50,100,150,200,250,300,350,400,450,500]
    const clusterColours = ["orange","blue","purple","green","brown","pink"];
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        points.forEach(({ boundedX, boundedY,colour }) => {
            const canvasX = boundedX;
            const canvasY = canvas.height - boundedY;
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }, [points]);
    
      const  handleClick =  async (e: { clientX: number; clientY: number; }) => {
        setClearedClicked(false);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const boundedX = Math.min(500,(Math.max(x,0)))
        const boundedY = Math.min(500,(Math.max(500-y,0)))

    setPoints((prevPoints) => {
        if (prevPoints.length > 0) {
            for (let i = 0; i < prevPoints.length; i++) {
                prevPoints[i].isNew = false;
                prevPoints[i].colour = "grey";
              }
            prevPoints[prevPoints.length - 1].colour = 'grey';
        }
        setFetchFlag(true);
        return [...prevPoints, { boundedX, boundedY, colour: 'black', isNew: true, clusters: -1 }];
    });
      };
      useEffect(() => {
        const fetchData = async () => {
            if(points[0]!=undefined&&fetchFlag){
               
            setFetchFlag(false);
              const KMeansData =  await handleSendData({coordinates:points,numberOfClusters:Number(clusters)});
              console.log("New Line Data",KMeansData)
              const assignedClusters = KMeansData.AssignedCusters;
              const CentroidLocations = KMeansData.CentroidLocations;

              const canvas = canvasRef.current;
              const ctx = canvas.getContext("2d");
              console.log("centroids",CentroidLocations)
              CentroidLocations.forEach((centroid: number[], index:number) => {
                const canvasX = centroid[0];
                const canvasY = canvas.height - centroid[1];
                console.log("index",index)
                console.log("colour", clusterColours[index]);
                ctx.fillStyle = clusterColours[index];
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
                ctx.fill();
            });

              setPoints((prevPoints) => {
                // Update the color of the previous last point
                if (prevPoints.length > 1) {
                  for (let i = 0; i < assignedClusters.length; i++) {
                      const index = assignedClusters[i];
              
                      // Ensure that the index is within bounds
                      if (index < prevPoints.length) {
                          prevPoints[i].colour = clusterColours[Math.min(5, Math.max(0, index))];
                      }
                  }
              }
              console.log("new pointts",prevPoints)
                return [...prevPoints];
              });
            }
        };
        fetchData();
    }, [fetchFlag,points]);
    useEffect(()=>{
      if(randomClicked){
        setClearedClicked(false);
        setPoints(getRandomData());
      }
    },[randomClicked])
    useEffect(()=>{
      if(clearedClicked){
        setRandomClicked(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPoints([]);
      }
    },[clearedClicked])
    
    return(
        <>
       <div className="grid-container">
      <div className="axis-container">
        <div className="graph-axis left-axis">
            <div className="axis-label">
            {Array.from({ length: 1 }, (_, index) => (
  <div className="first-tick" key={index} >{gridTicks[index]}</div>
))}
            {Array.from({ length: 10 }, (_, index) => (
  <div className="tick" key={index} >{gridTicks[index+1]}</div>
))}
            </div>
        </div>
        <div className="graph-axis bottom-axis">
          <div className="axis-labelX">
          {Array.from({ length: 1 }, (_, index) => (
  <div className="first-tickX" key={index} >{gridTicksX[index]}</div>
))}
            {Array.from({ length: 10 }, (_, index) => (
  <div className="tickX" key={index} >{gridTicksX[index+1]}</div>
))}
          </div>
        </div>
      </div>
      <div id="graphContainer" className="graph-container">
        <ClickableArea onAddPoint={handleClick} />
      </div>
    </div>
    <canvas className="canvas"
          ref={canvasRef}
          width={500}
          height={500}
          style={{ border: "1px solid black" }}
          onClick={handleClick}
        />
      <div style={{marginTop:-850,marginLeft:550, backgroundColor:"rgba(227, 241, 241, 0.669)",width:"250px",padding:5,height:'50px',display:'flex',flexDirection:'row',borderRadius:10,justifyContent:'center',alignContent:'center'
      }}>
      <div style={{display:'flex',flexDirection:'row',marginTop:'5px',marginLeft:'-5px'}}>
      <RandomizeButton handleClick={() => setRandomClicked(true)} title="Randomise" disabled={randomClicked}></RandomizeButton>
      <RandomizeButton handleClick={() => setClearedClicked(true)} title="Clear" disabled={clearedClicked}></RandomizeButton>
      </div>
      </div>
    </>
    )
}