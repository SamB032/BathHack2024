import "./point.css";
interface PointProps{
    x:number;
    y:number;
}
export default function Point({x,y}:PointProps){
   
        return(
            <div style={{ position: 'relative', top: y, left: x}}>
            <div className="point"></div>
        </div>
        )
    }