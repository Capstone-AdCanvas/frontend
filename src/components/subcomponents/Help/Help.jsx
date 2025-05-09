import React from "react";
import "./Help.css";

import GradientBox from "../../GradientBox/GradientBox";

const Help = () => {
  return (
    <div className="help__screen">
      <GradientBox>
        AI Image와 AI Video 기능을
        <br /> 이용해보세요!
      </GradientBox>
    </div>
  );
};

export default Help;
