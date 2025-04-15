import React from "react";
import "./Step3.css";
import sampleImage from "../../../assets/두부_배경제거.png";
import ImageUploadBox from "../../../components/ImageUploadBox/ImageUploadBox";

function Step3({ setCurrentStep }) {

    const handleNextStep = () => {
        setCurrentStep(4);
      };

      
  return (
    <div className="step3">
      <div className="step3__container">
        <div className="step3__left">
          <div className="step3__image">
            <img src={sampleImage} alt="Sample" />
          </div>
        </div>
        <div className="step3__right">
          <div className="step3__upload">
            <ImageUploadBox
              title="로고 업로드"
              uploadTitle="Click to Upload or drag and drop"
              supportText="Support JPG/PNG Files"
              width="600px"
              height="700px"
              uploadBoxWidth="510px"
              uploadBoxHeight="300px"
              showMyLogoBox={true}
            />
          </div>
        </div>
      </div>
          <button className="next-step-button" onClick={handleNextStep}>
            &gt;
          </button>
    </div>
  );
}

export default Step3;
