interface ButtonsProps {
    handleClick: (status: boolean) => void;
  }
  
  export default function RandomizeButton({ handleClick }: ButtonsProps) {
    return (
      <div>
        {/* Pass a function reference to onClick */}
        <button onClick={() => handleClick(true)}>Randomise</button>
      </div>
    );
  }