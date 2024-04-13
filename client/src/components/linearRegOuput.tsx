import "./ouputs.css";
interface InputData {
    title: string;
    value: string; // Assuming value is of type string, adjust as needed
}

function LinearRegOutputs({ title, value }: InputData) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <div className="outputContainer">
                <div className="title">Output</div>
                <div className="sub-text">Loss being calculated with:</div>
                <div className="sub-text-bold"> {title}</div>
                <div className="sub-text">Current Value:</div>
                <div className="sub-text-bold"> {value}</div>
            </div>
        </div>
    );
}

export default LinearRegOutputs;
