import React, { useState } from "react";
import "./AiImages.css";
import StepBar from "../../components/StepBar/StepBar";
import Step1 from "./Step1/Step1";


function AiImages() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="aiImages">
      <StepBar currentStep={currentStep} />
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
      {/* 나중에 Step2, Step3, Step4 컴포넌트를 조건부로 추가하면 됩니다. */}
    </div>
  );
}

export default AiImages;
