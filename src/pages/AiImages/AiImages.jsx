import React, { useState } from "react";
import "./AiImages.css";
import StepBar from "../../components/StepBar/StepBar";
import Step1 from "./Step1/Step1";


function AiImages() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="aiImages">
      <StepBar currentStep={currentStep} />
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}'
    </div>
  );
}

export default AiImages;
