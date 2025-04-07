import React from "react";
import "./Step1.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import image from "../../../assets/AI Images.png";

function Step1({ setCurrentStep }) {
  return (
    <div className="step1">
      <GradientBox width={550} height={350}>
        <div className="image-upload">
          <img src={image} alt="AI Upload" />
          <h2>이미지 업로드</h2>
        </div>
      </GradientBox>
    </div>
  );
}

export default Step1;
