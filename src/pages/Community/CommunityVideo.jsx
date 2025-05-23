import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import dummyVideo from "../../assets/dummyvideo.mp4";
import ModalVideo from "../../components/ModalVideo/ModalVideo";
import { fetchUserInfoById } from "../../api/user"; // ✅ 유저 프로필
import { fetchOtherVideos } from "../../api/video";

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

const CommunityVideo = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [videos, setVideos] = useState([]);
  const [userMap, setUserMap] = useState({});
  const userId = localStorage.getItem("id");

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
    const fetchData = async () => {
      if (!userId) return;

      // 1. 비디오 조회
      const otherVideos = await fetchOtherVideos(userId);
      setVideos(otherVideos);

      // 2. 썸네일 생성
      const thumbMap = {};
      for (const video of otherVideos) {
        try {
          const thumb = await getVideoThumbnail(video.finalVideo);
          thumbMap[video.id] = thumb;
        } catch {
          thumbMap[video.id] = video.finalVideo; // fallback
        }
      }
      setVideoThumbnails(thumbMap);

      // 3. 사용자 정보 및 로컬 이미지
      const localProfileImages = JSON.parse(
        localStorage.getItem("userProfileImages") || "{}"
      );
      const userIds = [...new Set(otherVideos.map((v) => v.userId))];
      const map = {};

      await Promise.all(
        userIds.map(async (id) => {
          const userInfo = await fetchUserInfoById(id);
          const email = userInfo?.email;
          map[id] = {
            profileName: userInfo?.name || `User ${id}`,
            profileImage: localProfileImages[email] || userIcon,
          };
        })
      );

      setUserMap(map);
    };

    fetchData();
  }, [userId]);

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
          {videos.map((video, idx) => {
            const profileName =
              userMap[video.userId]?.profileName || `User ${video.userId}`;
            const profileImage =
              userMap[video.userId]?.profileImage || userIcon;

            return (
              <Box
                key={video.id}
                width={400}
                height={215}
                title={video.name || `커뮤니티 비디오 ${idx + 1}`}
                userImage={profileImage}
                username={profileName}
                dataImage={videoThumbnails[video.id]}
                onClick={() =>
                  handleBoxClick({
                    dataImage: video.finalVideo,
                    title: video.name || `커뮤니티 비디오 ${idx + 1}`,
                    username: profileName,
                  })
                }
              />
            );
          })}
        </div>
      </div>

      <ModalVideo
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isCommunity={true}
      />
    </section>
  );
};

export default CommunityVideo;
