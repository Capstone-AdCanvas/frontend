import React from "react";
import "./ModalVideo.css";

const ModalVideo = ({ video, onClose, isCommunity }) => {
  if (!video) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = video.dataImage;
    link.download = `${video.title}.${video.extension}`;
    link.click();
  };

  return (
    <div className="modalVideo-overlay" onClick={onClose}>
      <div
        className="modalVideo-box fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalVideo-preview">
          <video
            src={video.dataImage}
            controls
            style={{ width: "100%", height: "100%", borderRadius: "15px" }}
          />
        </div>

        <div className="modalVideo-download-info">
          <div className="modalVideo-video-info">
            <div className="modalVideo-name">
              {video.title}.{video.extension}
            </div>
            <div className="modalVideo-size">{video.size}</div>
          </div>

          <div className="modalVideo-video-info2">
            {isCommunity && (
              <div className="modalVideo-username">
                만든 사람: {video.username}
              </div>
            )}
            <button
              className="modalVideo-download-button"
              onClick={handleDownload}
            >
              다운로드
            </button>
          </div>
        </div>

        <button className="modalVideo-close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ModalVideo;
