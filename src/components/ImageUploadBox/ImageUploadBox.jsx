import React, { useRef, useState } from "react";
import "./ImageUploadBox.css";
import GradientBox from "../GradientBox/GradientBox";
import defaultImage from "../../assets/AI Images.png";
import uploadIcon from "../../assets/uploadIcon.png";

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
  onFileUpload,
  logos = [],
  onLogoSelect
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFile = (file) => {
    if (file && isValidImage(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
    } else {
      alert("JPG 또는 PNG 이미지 파일만 업로드할 수 있습니다.");
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const isValidImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:8080/uploads/logo/${imageUrl.split('/').pop()}`;
  };

  const handleLogoClick = (logo) => {
    if (onLogoSelect) {
      onLogoSelect(logo);
    }
  };

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
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!previewUrl ? (
          <>
            <div className="upload-content">
              <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
              <span>{uploadTitle}</span>
            </div>
            <div className="upload-support">{supportText}</div>
          </>
        ) : (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* My logo 박스 */}
      {showMyLogoBox && (
        <div className="mylogo-wrapper">
          <div className="mylogo-title">My logo</div>
          <div className="mylogo-box">
            {logos.length > 0 ? (
              <div className="mylogo-grid">
                {logos.map((logo, index) => (
                  <div 
                    key={index} 
                    className="mylogo-item"
                    onClick={() => handleLogoClick(logo)}
                  >
                    <img 
                      src={getFullImageUrl(logo.logoImage)} 
                      alt={`Logo ${index + 1}`} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mylogo-empty">업로드된 로고가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </GradientBox>
  );
};

export default ImageUploadBox;
