import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import ModalVideo from "../../components/ModalVideo/ModalVideo";
import { fetchUserInfoById } from "../../api/user";
import { fetchUserVideos } from "../../api/video";

// ✅ 썸네일 추출 함수
const getVideoThumbnail = (videoSrc) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", () => {
      video.currentTime = 0.1;
    });

    video.addEventListener("seeked", () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      }
    });

    video.addEventListener("error", (e) => {
      reject(e);
    });
  });
};

const MyCreativesVideo = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [userVideos, setUserVideos] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(userIcon);
  const userId = localStorage.getItem("id");

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
    const fetchData = async () => {
      if (!userId) return;

      const videos = await fetchUserVideos(userId);
      setUserVideos(videos);

      // 썸네일 생성
      const thumbResults = await Promise.all(
        videos.map(async (video) => {
          try {
            const thumb = await getVideoThumbnail(video.finalVideo);
            return { id: video.id, thumb };
          } catch {
            return { id: video.id, thumb: video.finalVideo }; // fallback
          }
        })
      );

      const thumbMap = {};
      thumbResults.forEach(({ id, thumb }) => {
        thumbMap[id] = thumb;
        console.log(`videoId: ${id}, 썸네일: ${thumb}`); // 콘솔 오류 출력
      });
      setVideoThumbnails(thumbMap);

      // 프로필 정보
      const userInfo = await fetchUserInfoById(userId);
      setProfileName(userInfo?.name || `User ${userId}`);

      const imageMap = JSON.parse(
        localStorage.getItem("userProfileImages") || "{}"
      );
      const image = imageMap[userInfo?.email] || userIcon;
      setProfileImage(image);
    };

    fetchData();
  }, [userId]);

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
          {userVideos.map((video, idx) => (
            <Box
              key={video.id}
              width={400}
              height={215}
              title={video.name || `나의 비디오 ${idx + 1}`}
              userImage={profileImage}
              username={profileName}
              dataImage={videoThumbnails[video.id]} // ✅ 썸네일 또는 fallback
              onClick={() =>
                handleBoxClick({
                  dataImage: video.finalVideo,
                  title: video.name || `나의 비디오 ${idx + 1}`,
                  username: profileName,
                })
              }
            />
          ))}
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
