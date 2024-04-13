
import "./graph.css";
import ClickableArea from "./clickableArea";
import {  useEffect, useRef, useState } from "react";
export default function Graph(){
    const canvasRef = useRef(null);
    const [reDrawFlag,setReDrawFlag] = useState(false);
    const [lineData,setLineData]=useState({
        xMax:500, slope:-1.5,intercept:0,
    })
    const [points, setPoints] = useState([
      { boundedX: 0, boundedY: 500,colour:"grey",isNew:false },
      { boundedX: 200, boundedY: 20,colour:"grey",isNew:false },
      { boundedX: 300, boundedY: 30,colour:"grey",isNew:false },
      { boundedX: 400, boundedY: 40,colour:"grey",isNew:false}
    ]);
    const gridTicks=[500,450,400,350,300,250,200,150,100,50,0]
    const gridTicksX=[0,50,100,150,200,250,300,350,400,450,500]
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
    
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw points
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
    useEffect(()=>{
        const line = lineData
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const intercept = 500-line.intercept
        ctx.beginPath();
        ctx.moveTo(0, intercept);
        ctx.lineTo(line.xMax,line.xMax * line.slope + intercept);
        ctx.stroke();
    },[lineData,reDrawFlag])
      const handleClick = (e) => {
        setReDrawFlag(!reDrawFlag);
        //could await here
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const boundedX = Math.min(500,(Math.max(x,0)))
        const boundedY = Math.min(500,(Math.max(500-y,0)))
        const colour="grey"
console.log(boundedX,boundedY)
        setPoints((prevPoints) => [...prevPoints, { boundedX, boundedY,colour,isNew:true }]);
      };
    
    
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
    </>
    )
}