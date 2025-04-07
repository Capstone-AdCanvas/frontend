import React, { useRef } from "react";
import "./Step1.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import image from "../../../assets/AI Images.png";
import uploadIcon from "../../../assets/uploadIcon.png"; // 업로드 아이콘 파일을 import 합니다.

function Step1({ setCurrentStep }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Dropped file:", files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
    }
  };

  return (
    <div className="step1">
      <GradientBox width={600} height={350}>
        <div className="image-upload">
          <img src={image} alt="AI Upload" />
          <h2>이미지 업로드</h2>
        </div>
        <div
          className="upload-box"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
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
      </GradientBox>
    </div>
  );
}

export default Step1;
