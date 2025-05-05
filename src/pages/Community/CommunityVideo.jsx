import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import dummyVideo from "../../assets/dummyvideo.mp4";

// 해당 비디오 0초(시작타이밍)에 썸네일 장면으로 나오게 하는 함수
const getVideoThumbnail = (videoSrc) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous"; // CORS 방지용

    video.addEventListener("loadeddata", () => {
      video.currentTime = 0;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/png");
      resolve(imageUrl);
    });

    video.addEventListener("error", (e) => {
      reject("썸네일 생성 실패", e);
    });
  });
};

const CommunityVideo = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const handleImageClick = () => {
    navigate("/Community/image");
  };

  const handleBoxClick = (videoData) => {
    const extension = videoData.dataImage.split(".").pop().split("?")[0];

    setSelectedVideo({
      ...videoData,
      extension,
      size: "1920 x 1080", // 고정 또는 추후 video metadata로 설정 가능
    });
  };

  useEffect(() => {
    getVideoThumbnail(dummyVideo).then((thumb) => {
      setVideoThumbnail(thumb);
    });
  }, []);

  return (
    <section className="communityVideoPage">
      <header className="communityVideoPage__header">
        <article
          className="communityVideoPage__image"
          onClick={handleImageClick}
        >
          <h2>Other's AI Image</h2>
          <span>
            View other people's
            <br />
            AI image
          </span>
          <div className="communityVideoPage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article className="communityVideoPage__video">
          <h2>Other's AI Video</h2>
          <span>
            View other people's
            <br />
            AI video
          </span>
          <div className="communityVideoPage__video__image">
            <img src={videoPicture} alt="" />
          </div>
        </article>
      </header>
      <div className="communityVideoPage__contents">
        <span className="communityVideoPage__contents__title">
          Others's AI Video
          <br />
          Contents
        </span>
        <div className="communityVideoPage__contents__image">
          {videoThumbnail && (
            <Box
              width={400}
              height={215}
              title="장난감"
              userImage={userIcon}
              username="Chill guy"
              dataImage={videoThumbnail} // 썸네일
              onClick={() =>
                handleBoxClick({
                  dataImage: dummyVideo,
                  title: "장난감",
                  username: "Chill guy",
                })
              }
            />
          )}
          {/* Other boxes omitted for brevity */}
          <Box
            width={400}
            height={215}
            title="Video 2"
            userImage="https://via.placeholder.com/50"
            username="User2"
          />
          <Box
            width={400}
            height={215}
            title="Video 3"
            userImage="https://via.placeholder.com/50"
            username="User3"
          />
          <Box
            width={400}
            height={215}
            title="Video 4"
            userImage="https://via.placeholder.com/50"
            username="User4"
          />
          <Box
            width={400}
            height={215}
            title="Video 5"
            userImage="https://via.placeholder.com/50"
            username="User5"
          />
          <Box
            width={400}
            height={215}
            title="Video 6"
            userImage="https://via.placeholder.com/50"
            username="User6"
          />
        </div>
      </div>

      {selectedVideo && (
        <div
          className="communityVideo-download-box-overlay"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="communityVideo-download-box fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="communityVideo-download-preview">
              <video
                src={selectedVideo.dataImage}
                controls
                style={{ width: "100%", height: "100%", borderRadius: "15px" }}
              />
            </div>
            <div className="communityVideo-download-info">
              <div className="communityVideo-video-info">
                <div className="communityVideo-video-name">
                  {selectedVideo.title}.{selectedVideo.extension}
                </div>
                <div className="communityVideo-video-size">
                  {selectedVideo.size}
                </div>
              </div>

              <div className="communityVideo-video-info2">
                <div className="communityVideo-video-username">
                  만든 사람: {selectedVideo.username}
                </div>
                <button
                  className="communityVideo-download-button"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = selectedVideo.dataImage;
                    link.download = `${selectedVideo.title}.${selectedVideo.extension}`;
                    link.click();
                  }}
                >
                  다운로드
                </button>
              </div>
            </div>
            <button
              className="communityVideo-modal-close-button"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityVideo;
