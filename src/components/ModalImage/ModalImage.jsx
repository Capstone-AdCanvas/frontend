import React from "react";
import "./ModalImage.css";

const ModalImage = ({ image, onClose, isCommunity }) => {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.dataImage;
    link.download = `${image.title}.${image.extension}`;
    link.click();
  };

  return (
    <div className="modalImage-overlay" onClick={onClose}>
      <div
        className="modalImage-box fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalImage-preview">
          <img src={image.dataImage} alt="Preview" />
        </div>

        <div className="modalImage-download-info">
          <div className="modalImage-image-info">
            <div className="modalImage-name">
              {image.title}.{image.extension}
            </div>
            <div className="modalImage-size">{image.size}</div>
          </div>

          <div className="modalImage-image-info2">
            {isCommunity && (
              <div className="modalImage-username">
                만든 사람: {image.username}
              </div>
            )}
            <button
              className="modalImage-download-button"
              onClick={handleDownload}
            >
              다운로드
            </button>
          </div>
        </div>

        <button className="modalImage-close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ModalImage;
