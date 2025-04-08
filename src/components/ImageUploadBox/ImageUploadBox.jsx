import React from "react";
import "./ImageUploadBox.css";
import GradientBox from "../GradientBox/GradientBox";
import defaultImage from "../../assets/AI Images.png";

const ImageUploadBox = ({
  width = "600px",           // GradientBox 가로 크기
  height = "350px",          // 파일 미업로드 시 GradientBox 높이
  uploadBoxWidth = "520px",  // 업로드 박스 폭
  uploadBoxHeight = "300px", // 업로드 박스 높이
  icon,                    // 업로드 안내 아이콘 (옵션: 업로드 박스 내부에 표시)
  title = "이미지 업로드",  // 상단 영역 텍스트
  uploadTitle = "Click to Upload or drag and drop", // 업로드 박스 내부 텍스트
  supportText = "Support JPG/PNG Files"
}) => {
  return (
    <GradientBox width={width} height={height} className="image-upload-box-gradient">
      {/* 상단 영역: 기존 이미지 업로드 아이콘 및 텍스트 */}
      <div className="image-upload">
        <img src={defaultImage} alt="AI Upload" />
        <h2>{title}</h2>
      </div>
      {/* 업로드 박스 영역 */}
      <div
        className="upload-box"
        style={{ width: uploadBoxWidth, height: uploadBoxHeight }}
      >
        <div className="upload-content">
          {icon && (
            <img src={icon} alt="Upload Icon" className="upload-icon" />
          )}
          <span>{uploadTitle}</span>
        </div>
        <div className="upload-support">{supportText}</div>
      </div>
    </GradientBox>
  );
};

export default ImageUploadBox;
