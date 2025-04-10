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
  const [showDownloadBox, setShowDownloadBox] = useState(false);
  const [showNextStepButton, setShowNextStepButton] = useState(false);

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

  // 배경제거 완료 후 슬라이더 애니메이션: 이미지가 왼쪽으로 이동
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

  // 최종 애니메이션 후 다운로드 박스가 fade-in 효과로 나타남
  useEffect(() => {
    if (isAnimationDone) {
      const timer = setTimeout(() => {
        setShowDownloadBox(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimationDone]);

  // 다운로드 박스가 나타난 후 2초 후에 다음 단계 버튼이 나타남
  useEffect(() => {
    if (showDownloadBox) {
      setShowNextStepButton(true); // ✅ 즉시 true로 변경!
    }
  }, [showDownloadBox]);
  
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
                  <button
                    className="close-button"
                    onClick={() => setUploadedImage(null)}
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
                  src={sampleImage}
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
            // 최종 화면: 동일 컨테이너 내에서 이미지와 다운로드 박스가 겹쳐서 표시됨
            <div className="final-screen">
              <div className="final-image-container">
                <img
                  src={sampleImage}
                  alt="Final"
                  className="final-image-move"
                />
              </div>
              {showDownloadBox && (
                <div className="download-box fade-in">
                  <div className="download-info">
                    <div className="image-name">강아지.jpg</div>
                    <div className="image-size">사이즈: 400 × 400</div>
                    <button className="download-button">다운로드</button>
                  </div>
                </div>
              )}
              {showNextStepButton && (
                <button className="next-step-button" onClick={()=>setCurrentStep(2)}>
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
