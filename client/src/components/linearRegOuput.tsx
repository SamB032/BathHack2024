import "./ouputs.css";
interface InputData {
    title: string;
    value: number; 
    modelType:string;
}

function LinearRegOutputs({ title, value ,modelType}: InputData) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}> <div className="outputContainer">
            {modelType == "LMR"&& <>
            <div className="title">Output</div>
            <div className="sub-text">Loss being calculated with:</div>
            <div className="sub-text-bold"> {title}</div>
            <div className="sub-text">Current Value:</div>
            <div className="sub-text-bold"> {value}</div></>}
            {modelType == "KNN"&&
             <>
             <div className="title">Output</div>
             <div className="sub-text">{title}:</div>
             <div className="sub-text-bold"> Distance 1 distance 2</div></>}
            {modelType == "k-means"&&
             <>
             <div className="title">Output</div>
             <div className="sub-text">Loss being calculated with:</div>
             <div className="sub-text-bold"> {title}</div>
             <div className="sub-text">Current Value:</div>
             <div className="sub-text-bold"> {value}</div></>}
           
               
            </div>
        </div>
    );
}

export default LinearRegOutputs;
