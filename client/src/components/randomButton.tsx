interface ButtonsProps {
    handleClick: (status: boolean) => void;
    title:string;
  }
  
  export default function Button({ handleClick,title }: ButtonsProps) {
    return (
      <div>
        {/* Pass a function reference to onClick */}
        <button onClick={() => handleClick(true)}>{title}</button>
      </div>
    );
  }