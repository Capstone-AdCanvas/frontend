import React, { useState, useEffect } from "react";
import "./Step3.css";
import sampleImage from "../../../assets/두부_배경제거.png";
import ImageUploadBox from "../../../components/ImageUploadBox/ImageUploadBox";
import { uploadLogo, getLogos } from "../../../api/image";

function Step3({ setCurrentStep }) {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await getLogos();
      console.log('로고 데이터:', response);  // 로고 데이터 로깅
      setLogos(response);
    } catch (error) {
      console.error('로고 조회 실패:', error);
    }
  };

  const handleLogoUpload = async (file) => {
    try {
      await uploadLogo(file);
      fetchLogos(); // 로고 업로드 후 목록 새로고침
    } catch (error) {
      console.error('로고 업로드 실패:', error);
    }
  };

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
              onFileUpload={handleLogoUpload}
              logos={logos}
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
