import React, { MouseEventHandler } from "react";

interface ClickableAreaProps {
    onAddPoint: MouseEventHandler<HTMLDivElement>;
}

const ClickableArea: React.FC<ClickableAreaProps> = ({ onAddPoint}) => {
    return (
        <div onClick={onAddPoint}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1 // Ensure clickable area is on top of canvas
      }}>
     
        </div>
    );
};

export default ClickableArea;
