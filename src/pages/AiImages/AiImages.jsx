import React, { useState } from "react";
import "./AiImages.css";
import StepBar from "../../components/StepBar/StepBar";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

function AiImages() {
  const [currentStep, setCurrentStep] = useState(3);

  return (
    <div className="aiImages">
      <StepBar currentStep={currentStep} />
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
    </div>
  );
}

export default AiImages;
