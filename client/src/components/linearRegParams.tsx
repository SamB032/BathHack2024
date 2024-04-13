
import "./ouputs.css";
interface InputData {
    title: string;
    value: string; // Assuming value is of type string, adjust as needed
}
function LinearRegParams({ title, value }: InputData) {
  return (
    <div style={{
        display:"flex",
       marginRight:"100px",
       width:"0px",
       height:"300px",
       padding:5,
    }}>
 <div className="outputContainer">
                <div className="title">Paramters</div>
                <div className="sub-text">Customise these to change how the model behaves:</div>
                <div className="sub-text-bold"> {title}</div>
                <div className="sub-text">Current Value:</div>
                <div className="sub-text-bold"> {value}</div>
            </div>
    </div>
  );
}

export default LinearRegParams;