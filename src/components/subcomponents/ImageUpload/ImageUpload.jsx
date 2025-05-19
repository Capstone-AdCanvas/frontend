import React, { useRef, useState } from "react";
import "./ImageUpload.css";
import imageuploadIcon from "../../../assets/logo-imageupload.png";
import uploadIcon from "../../../assets/uploadIcon.png";

const ImageUpload = ({ setImageUploaded, setImageFile }) => {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 클릭하여 파일 선택
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 처리
  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // 드래그 앤 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 이미지 유효성 검사 + 미리보기 처리
  const handleFile = (file) => {
    if (file && isValidImage(file)) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageUploaded(true);
      setImageFile(file); // 이미지 파일 저장
    } else {
      alert("JPG 또는 PNG 이미지 파일만 업로드할 수 있습니다.");
    }
  };

  const isValidImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="imageupload__screen">
      <span className="imageupload__screen__title">
        <img src={imageuploadIcon} alt="" />
        이미지 업로드
      </span>

      <div
        className="imageupload__screen__uploadbox"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!previewUrl ? (
          <>
            <header className="imageupload__screen__uploadbox__title">
              <img src={uploadIcon} alt="uploadIcon" />
              {fileName || "Click to Upload or drag and drop"}
            </header>
            <span className="imageupload__screen__uploadbox__support">
              Support JPG/PNG Files
            </span>
          </>
        ) : (
          <img
            src={previewUrl}
            alt="preview"
            className="imageupload__screen__preview"
          />
        )}

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
