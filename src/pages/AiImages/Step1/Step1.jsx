import React, { useRef, useState, useEffect } from "react";
import "./Step1.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import image from "../../../assets/AI Images.png";
import uploadIcon from "../../../assets/uploadIcon.png";
import sampleImage from "../../../assets/두부_배경제거.png";

function Step1({ setCurrentStep }) {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleBackgroundRemove = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 5000);
  };

  // 자동 애니메이션
  useEffect(() => {
    if (isComplete) {
      let position = 0;
      const interval = setInterval(() => {
        position += 1;
        setSliderPosition(position);
        if (position >= 100) {
          clearInterval(interval);
          setIsAnimationDone(true);
        }
      }, 40); // 총 2초 (100 * 20ms)
    }
  }, [isComplete]);

  return (
    <div className="step1">
      {!isComplete ? (
        <GradientBox
          width={600}
          height={uploadedImage ? 500 : 350}
          className="step1-gradient"
        >
          {!uploadedImage ? (
            <>
              <div className="image-upload">
                <img src={image} alt="AI Upload" />
                <h2>이미지 업로드</h2>
              </div>
              <div
                className="upload-box"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="upload-content">
                  <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                  <span>Click to Upload or drag and drop</span>
                </div>
                <div className="upload-support">Support JPG/PNG Files</div>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  ref={fileInputRef}
                  className="upload-input"
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : (
            <div className="uploaded-content">
              <div className="image-wrapper">
                {!isLoading && (
                  <button className="close-button" onClick={() => setUploadedImage(null)}>×</button>
                )}
                <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
              </div>
              <button
                className="background-remove-btn"
                onClick={handleBackgroundRemove}
                disabled={isLoading}
              >
                {isLoading ? <div className="spinner" /> : "배경 제거"}
              </button>
            </div>
          )}
        </GradientBox>
      ) : (
        <>
          {!isAnimationDone ? (
            <div className="image-transition-wrapper">
              <div className="image-blend-container">
                {/* 샘플 이미지 - 왼쪽부터 점점 보임 (아래 쪽) */}
                <img
                  src={sampleImage}
                  alt="After"
                  className="image-half"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    zIndex: 1
                  }}
                />
                {/* 기존 이미지 - 오른쪽부터 점점 사라짐 (위쪽) */}
                <img
                  src={uploadedImage}
                  alt="Before"
                  className="image-half"
                  style={{
                    clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                    zIndex: 2
                  }}
                />
                {/* 흰색 막대 */}
                <div
                  className="auto-wipe-bar"
                  style={{ left: `${sliderPosition}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="image-transition-wrapper">
              <div className="image-blend-container">
                <img src={sampleImage} alt="Final" className="image-half" style={{ clipPath: "none" }} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Step1;
