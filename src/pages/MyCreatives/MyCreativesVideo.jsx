import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import dummyVideo from "../../assets/dummyvideo.mp4";
import ModalVideo from "../../components/ModalVideo/ModalVideo";

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

const MyCreativesVideo = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const handleImageClick = () => {
    navigate("/MyCreatives/image");
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
    <section className="mycreativesVideoPage">
      <header className="mycreativesVideoPage__header">
        <article
          className="mycreativesVideoPage__image"
          onClick={handleImageClick}
        >
          <h2>My AI Image</h2>
          <span>Check my Ai image</span>
          <div className="mycreativesVideoPage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article className="mycreativesVideoPage__video">
          <h2>My AI Video</h2>
          <span>Check my Ai video</span>
          <div className="mycreativesVideoPage__video__image">
            <img src={videoPicture} alt="" />
          </div>
        </article>
      </header>
      <div className="mycreativesVideoPage__contents">
        <span className="mycreativesVideoPage__contents__title">
          My AI Videos
        </span>
        <div className="mycreativesVideoPage__contents__image">
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

      <ModalVideo
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isCommunity={false}
      />
    </section>
  );
};

export default MyCreativesVideo;
