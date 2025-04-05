import React from "react";
import "./GradientBox.css";

const GradientBox = ({ width, height, children, className = "", style, ...props }) => {
  const innerStyle = {
    width: width,
    height: height,
    ...style,
  };

  return (
    <div className={`gradient-box ${className}`} {...props}>
      <div className="gradient-box__inner" style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

export default GradientBox;
