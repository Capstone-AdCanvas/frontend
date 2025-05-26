import React, { useState } from "react";
import "./AiImages.css";
import StepBar from "../../components/StepBar/StepBar";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";

function AiImages() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hideStepBar, setHideStepBar] = useState(false); //StepBar 표시 여부 제어
  const [bgRemovedImage, setBgRemovedImage] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);

  const handleStepChange = (step, data) => {
    if (data && data.selectedImage) {
      setFinalImageUrl(data.selectedImage);
    }
    setCurrentStep(step);
  };

  return (
    <div className="aiImages">
      {!hideStepBar && <StepBar currentStep={currentStep} />}
      {currentStep === 1 && (
        <Step1 
          setCurrentStep={handleStepChange} 
          setBgRemovedImage={setBgRemovedImage} 
        />
      )}
      {currentStep === 2 && (
        <Step2 
          setCurrentStep={handleStepChange} 
          bgRemovedImage={bgRemovedImage}
        />
      )}
      {currentStep === 3 && (
        <Step3 
          setCurrentStep={handleStepChange}
          selectedImage={finalImageUrl}
        />
      )}
      {currentStep === 4 && (
        <Step4 
          setCurrentStep={handleStepChange} 
          setHideStepBar={setHideStepBar}
          selectedImage={finalImageUrl}
        />
      )}
    </div>
  );
}

export default AiImages;
