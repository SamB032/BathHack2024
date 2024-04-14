
import { Dispatch, SetStateAction, useState } from "react";
import "./ouputs.css";

interface InputData {
    title: string;
    modelType: string;
    callback: (errorType:string) => void | Dispatch<SetStateAction<number>>;
}

function LinearRegParams({ title, modelType , callback}: InputData) {
  const [mae, setOption1] = useState(false);
  const [mse, setOption2] = useState(false);

  const [kValue, setKValue] = useState('2');
  const [cluster, setCluster] = useState('2');
  // Event handler to update kValue state only if the entered value is numeric
  const handleInputChange = (e:any) => {
    const inputValue = e.target.value;
    console.log(inputValue)
    console.log(modelType)
    if(modelType==="KNN"){
      // Check if the entered value is numeric using regex
      if (/^\d*$/.test(inputValue) || inputValue === '') {
        setKValue(inputValue);
       callback(inputValue);
      }
    }else if(modelType==="k-means"){
      if (/^\d*$/.test(inputValue) || inputValue === '') {
        setCluster(inputValue);
        //callback(inputValue);
      }
    }
  };

  const handleErrorChoice = (option:string) => {
    if(option == "mae"){
      setOption1(true);
      setOption2(false);
      callback("Mean Absolute Error (MAE)");

    } else if(option == "mse"){
      setOption1(false);
      setOption2(true);
      callback("Mean Squared Error (MSE)");
    }
  }

  return (
    <div style={{
        display:"flex",
       marginRight:"100px",
       width:"0px",
       height:"150px",
       padding:5,
    }}>
      

      <div className="outputContainer">
        <div className="title">Paramters</div>
        <div className="sub-text">Customise these to change how the model behaves:</div>
        <div className="sub-text-bold"> {title}</div>

        {
          modelType == "LRM" && 
          <div>
            <label htmlFor="mae"> MAE: </label>
            <input type="radio" name="mae" onClick={() => handleErrorChoice('mae')}/>

            <label htmlFor="mae"> MSE: </label>
            <input type="radio" name="mae" onClick={() => handleErrorChoice('mse')}/>

            <label htmlFor="mae"> MAE: </label>
            <input type="radio" name="mae" onClick={() => handleErrorChoice('mae')}/>
          </div>
        }


        {modelType == "KNN" && 
          <div>
            {/* Set K value */}
            <label htmlFor="k-value">Set K Value: </label>
            <input name="k-value" placeholder="2" type="text" onChange={handleInputChange} style={{fontSize:"1.1em", fontWeight:"bolder", width:"5em"}}/>
          </div>
        }

        {modelType == "k-means" && 
          <div>
            {/* Set Number of Clusters value */}
            <label htmlFor="k-cluster">Set K Clusters: </label>
            <input name="k-cluster" placeholder="2" type="text" onChange={handleInputChange} style={{fontSize:"1.1em", fontWeight:"bolder", width:"5em"}}/>
          </div>
        }


      </div>
    </div>
  );
}

export default LinearRegParams;