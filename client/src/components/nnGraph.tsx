
import "./graph.css";
import ClickableArea from "./clickableArea";
import {  useEffect, useRef, useState } from "react";
import RandomizeButton from "./randomButton";
import getRandomData from "../../utils/randomDataGenerator";
import { exportData, enteredData as pointData} from "../../utils/dataProps" ;
interface LinearRegProps{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
handleSendData:(data: exportData) => Promise<any>;
}
interface lineData{
  xMax:number;
  slope:number;
  intercept:number;
}
export default function NNGraph({handleSendData}:LinearRegProps){
    const canvasRef = useRef(null);
    const [reDrawFlag,setReDrawFlag] = useState(false);
    const [randomClicked,setRandomClicked]=useState(false);
    const [clearedClicked,setClearedClicked]=useState(false);
    const [lineData,setLineData]=useState<lineData>()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [globPointsToDraw,setGlobPointsToDraw]=useState<any[]>([]);
    const [globLocation,setGlobLocation]=useState<number[]>([]);
    const [fetchFlag,setFetchFlag]=useState(false);
    const [points, setPoints] = useState<pointData[]>([]);
    const gridTicks=[500,450,400,350,300,250,200,150,100,50,0]
    const gridTicksX=[0,50,100,150,200,250,300,350,400,450,500]
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
        globPointsToDraw.forEach((point)=>{

            const canvas = canvasRef.current;
            console.log(canvas)
            const ctx = canvas.getContext("2d");
          const point1 = { x: globLocation[0], y: globLocation[1] };
            const point2 = { x: point.x, y: point.y };

            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            console.log(point2.y)
            ctx.moveTo(point1.x, point1.y); 
            ctx.lineTo(point2.x, point2.y); 
            ctx.stroke(); 
            ctx.setLineDash([]); 
            
        })
      }, [points]);
    useEffect(()=>  {
        const line = lineData
        if(line){
    
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          points.forEach(({ boundedX, boundedY,colour }) => {
            const canvasX = boundedX;
            const canvasY = canvas.height - boundedY;
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
          ctx.fill();})
          const intercept = 500-line.intercept
          ctx.beginPath();
          ctx.moveTo(0, intercept);
          ctx.lineTo(line.xMax,line.xMax * line.slope + intercept);
          ctx.stroke();
        }
    },[lineData,reDrawFlag])
      const  handleClick =  async (e: { clientX: number; clientY: number; }) => {
        setReDrawFlag(!reDrawFlag);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const boundedX = Math.min(500,(Math.max(x,0)))
        const boundedY = Math.min(500,(Math.max(500-y,0)))
        const colour="blue"

    setPoints((prevPoints) => {
        if (prevPoints.length > 0) {
            for (let i = 0; i < prevPoints.length; i++) {
                prevPoints[i].isNew = false;
                prevPoints[i].colour = "grey";
              }
            prevPoints[prevPoints.length - 1].colour = 'grey';
        }
        setFetchFlag(true);
        return [...prevPoints, { boundedX, boundedY, colour: 'black', isNew: true, clusters: 0 }];
    });
      };
      useEffect(() => {
        const fetchData = async () => {
            if(points[0]!=undefined&&fetchFlag){
               
            setFetchFlag(false);
              //const nearestNeighData =  await handleSendData({coordinates:points,neighboursToConsider:2});
              //console.log("New Line Data",nearestNeighData)
              const location = [100,100];//nearestNeighData.location;
              setGlobLocation(location)
              //const neighboursToConsider = nearestNeighData.neighbours;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const pointsToDraw: any[] = [{ x: 257, y: 248 },{ x: 311, y: 279 }];
              setGlobPointsToDraw(pointsToDraw);
              const distances =[];

              setPoints((prevPoints) => {
                // Update the color of the previous last point
                /*if (prevPoints.length > 1) {
                  for (const neighbour of neighboursToConsider) {
                    prevPoints[neighbour.index].colour = 'red';
                    pointsToDraw.push(neighbour.point);
                    distances.push(neighbour.distance);
                  }
                }*/
                return [...prevPoints];
              });
            }
        };
        fetchData();
    }, [fetchFlag,points]);
    useEffect(()=>{
      if(randomClicked){
        setPoints(getRandomData());
      }
    },[randomClicked])
    useEffect(()=>{
      if(clearedClicked){
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