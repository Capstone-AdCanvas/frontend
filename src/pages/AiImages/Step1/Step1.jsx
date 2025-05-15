import React, { useRef, useState, useEffect } from "react";
import "./Step1.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import image from "../../../assets/AI Images.png";
import uploadIcon from "../../../assets/uploadIcon.png";
import { uploadImage, removeBackground } from "../../../api/image";

function Step1({ setCurrentStep }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [showDownloadBox, setShowDownloadBox] = useState(false);
  const [showNextStepButton, setShowNextStepButton] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [error, setError] = useState(null);

  // exit 애니메이션 실행 여부를 위한 state
  const [animateExit, setAnimateExit] = useState(false);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleBackgroundRemove = async () => {
    if (!selectedFile) return;
    
    try {
      setIsLoading(true);
      // 1. 먼저 이미지 업로드
      const uploadResult = await uploadImage(selectedFile);
      setImageId(uploadResult.id);
      
      // 2. 배경 제거 요청
      const result = await removeBackground(uploadResult.id);
      setProcessedImage(result.processedImage);
      setIsComplete(true);
      setError(null);
    } catch (err) {
      setError(err.message || '배경 제거에 실패했습니다.');
      setIsLoading(false);
    }
  };

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
      }, 20);
    }
  }, [isComplete]);

  useEffect(() => {
    if (isAnimationDone) {
      const timer = setTimeout(() => {
        setShowDownloadBox(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimationDone]);

  useEffect(() => {
    if (showDownloadBox) {
      setShowNextStepButton(true);
    }
  }, [showDownloadBox]);

  const handleNextStep = () => {
    setAnimateExit(true);
    setTimeout(() => {
      setCurrentStep(2);
    }, 1000);
  };

  return (
    <div className="step1">
      {error && <div className="error-message">{error}</div>}
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
                  <button
                    className="close-button"
                    onClick={() => {
                      setUploadedImage(null);
                      setImageId(null);
                      setError(null);
                    }}
                  >
                    ×
                  </button>
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
                <img
                  src={`http://localhost:8080${processedImage}`}
                  alt="After"
                  className="image-half"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    zIndex: 1,
                  }}
                />
                <img
                  src={uploadedImage}
                  alt="Before"
                  className="image-half"
                  style={{
                    clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                    zIndex: 2,
                  }}
                />
                <div
                  className="auto-wipe-bar"
                  style={{ left: `${sliderPosition}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="final-screen">
              <div className={`final-image-container ${animateExit ? "exit-animation" : ""}`}>
                <img
                  src={`http://localhost:8080${processedImage}`}
                  alt="Final"
                  className="final-image-move"
                />
              </div>
              {!animateExit && showDownloadBox && (
                <div className="download-box fade-in">
                  <div className="download-info">
                    <div className="image-name">배경제거_이미지.jpg</div>
                    <div className="image-size">사이즈: 400 × 400</div>
                    <button className="download-button">다운로드</button>
                  </div>
                </div>
              )}
              {!animateExit && showNextStepButton && (
                <button className="next-step-button" onClick={handleNextStep}>
                  &gt;
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Step1;
