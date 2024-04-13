interface ButtonsProps {
    handleClick: (status: boolean) => void;
    title:string;
    disabled:boolean;
  }
  
  export default function Button({ handleClick,title,disabled }: ButtonsProps) {
    return (
      <div>
        {/* Pass a function reference to onClick */}
        <button  style={{width:'125px',marginLeft:'5px'}}disabled={disabled} onClick={() => handleClick(true)}>{title}</button>
      </div>
    );
  }