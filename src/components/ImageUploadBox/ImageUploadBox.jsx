import React from "react";
import "./ImageUploadBox.css";
import GradientBox from "../GradientBox/GradientBox";
import defaultImage from "../../assets/AI Images.png";

const ImageUploadBox = ({
  width = "600px",
  height = "350px",
  uploadBoxWidth = "520px",
  uploadBoxHeight = "300px",
  icon,
  title = "이미지 업로드",
  uploadTitle = "Click to Upload or drag and drop",
  supportText = "Support JPG/PNG Files",
  showMyLogoBox = false,
}) => {
  return (
    <GradientBox width={width} height={height} className="image-upload-box-gradient">
      {/* 상단 아이콘 + 텍스트 */}
      <div className="image-upload">
        <img src={defaultImage} alt="AI Upload" />
        <h2>{title}</h2>
      </div>

      {/* 업로드 박스 */}
      <div
        className="upload-box"
        style={{ width: uploadBoxWidth, height: uploadBoxHeight }}
      >
        <div className="upload-content">
          {icon && <img src={icon} alt="Upload Icon" className="upload-icon" />}
          <span>{uploadTitle}</span>
        </div>
        <div className="upload-support">{supportText}</div>
      </div>

      {/* My logo 박스 */}
      {showMyLogoBox && (
        <div className="mylogo-wrapper">
          <div className="mylogo-title">My logo</div>
          <div className="mylogo-box"></div>
        </div>
      )}
    </GradientBox>
  );
};

export default ImageUploadBox;
