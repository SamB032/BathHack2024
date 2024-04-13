
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
export default function LinearRegGraph({handleSendData}:LinearRegProps){
    const canvasRef = useRef(null);
    const [reDrawFlag,setReDrawFlag] = useState(false);
    const [randomClicked,setRandomClicked]=useState(false);
    const [clearedClicked,setClearedClicked]=useState(false);
    const [lineData,setLineData]=useState<lineData>()
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
      }, [points]);
    useEffect(()=>  {
        const line = lineData
        console.log("called")
        if(line){
          
          console.log("line")
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
        console.log(reDrawFlag)
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const boundedX = Math.min(500,(Math.max(x,0)))
        const boundedY = Math.min(500,(Math.max(500-y,0)))
        const colour="grey"
console.log(boundedX,boundedY)
        setPoints((prevPoints) => {
          if (prevPoints.length > 0) {
              for (let i = 0; i < prevPoints.length; i++) {
                  prevPoints[i].isNew = false;
                  prevPoints[i].colour = "grey";
                }
              prevPoints[prevPoints.length - 1].colour = 'grey';
          }
          return [...prevPoints, { boundedX, boundedY, colour: 'black', isNew: true, clusters: 0 }];
        });
       

      };
      useEffect(() => {
        const fetchData = async () => {
            if(points[0]!=undefined){
              const newLineData = await handleSendData({coordinates:points});
              console.log("New Line Data",newLineData)
              setLineData({
                xMax: 500,
                slope: -newLineData.parameters[0],
                intercept: newLineData.parameters[1]
            });
            }
        };
        fetchData();
    }, [points]);
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