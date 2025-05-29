import React, { useEffect, useState } from "react";
import "./Home.css";
import Box from "../../components/Box/Box";
import imagePicture from "../../assets/home-aiimage.png";
import videoPicture from "../../assets/home-aivideo.png";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/profile-icon.png";

import sampleImg1 from "../../assets/sample/sample-images/샘플이미지1.jpg";
import sampleImg2 from "../../assets/sample/sample-images/샘플이미지2.jpg";
import sampleImg3 from "../../assets/sample/sample-images/샘플이미지3.jpg";
import sampleImg4 from "../../assets/sample/sample-images/샘플이미지4.jpg";

import sampleVideo1 from "../../assets/sample/sample-videos/샘플영상1.mp4";
import sampleVideo5 from "../../assets/sample/sample-videos/샘플영상5.mp4";
import sampleVideo3 from "../../assets/sample/sample-videos/샘플영상3.mp4";
import sampleVideo4 from "../../assets/sample/sample-videos/샘플영상4.mp4";
import ModalImage from "../../components/ModalImage/ModalImage";
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

function Home() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});

  const handleAiImageClick = () => {
    navigate("/AiImages");
  };
  const handleAiVideoClick = () => {
    navigate("/AiVideos");
  };

  const handleImageBoxClick = (imageData) => {
    const img = new Image();
    img.src = imageData.dataImage;

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const extension = imageData.dataImage.split(".").pop().split("?")[0];

      setSelectedImage({
        ...imageData,
        size: `${width} x ${height}`,
        extension,
      });
    };
  };

  const handleVideoBoxClick = (videoData) => {
    const extension = videoData.dataImage.split(".").pop().split("?")[0];

    setSelectedVideo({
      ...videoData,
      extension,
      size: "1920 x 1080", // 고정 또는 추후 video metadata로 설정 가능
    });
  };

  useEffect(() => {
    const loadThumbnails = async () => {
      const thumbs = {};

      try {
        const thumb1 = await getVideoThumbnail(sampleVideo1);
        thumbs[sampleVideo1] = thumb1;
      } catch (e) {
        console.error("썸네일 생성 실패:", e);
      }

      try {
        const thumb2 = await getVideoThumbnail(sampleVideo5);
        thumbs[sampleVideo5] = thumb2;
      } catch (e) {
        console.error("썸네일 생성 실패:", e);
      }

      try {
        const thumb3 = await getVideoThumbnail(sampleVideo3);
        thumbs[sampleVideo3] = thumb3;
      } catch (e) {
        console.error("썸네일 생성 실패:", e);
      }

      try {
        const thumb4 = await getVideoThumbnail(sampleVideo4);
        thumbs[sampleVideo4] = thumb4;
      } catch (e) {
        console.error("썸네일 생성 실패:", e);
      }

      setVideoThumbnails(thumbs);
    };
    loadThumbnails();
  }, []);

  return (
    <div className="homePage">
      <div className="homePage__title">
        <p className="home-subtitle">Redifinig Ad Creation with AI</p>
        <h3 className="home-title">Personal AI Creative Studio</h3>
      </div>
      <div className="AI_buttons">
        <button className="AI_buttons__image" onClick={handleAiImageClick}>
          <div className="AI_buttons__image--inner">
            <h3>Create AI Image</h3>
            <p>Turn Ideas into image</p>
            {/* <div className="AI_buttons__image--inner__image">
              <img src={imagePicture} alt="" />
            </div> */}
          </div>
        </button>
        <button className="AI_buttons__video" onClick={handleAiVideoClick}>
          <div className="AI_buttons__video--inner">
            <h3>Create AI Video</h3>
            <p>Turn Ideas into Video</p>
            {/* <div className="AI_buttons__video--inner__image">
              <img src={videoPicture} alt="" />
            </div> */}
          </div>
        </button>
      </div>
      <div className="others">
        <div className="others__image">
          <p>Images from Others</p>
          <div className="others__box">
            <Box
              width={310}
              height={204}
              title="Ramen"
              username="Alice"
              dataImage={sampleImg1}
              onClick={() =>
                handleImageBoxClick({
                  dataImage: sampleImg1,
                  title: "Ramen",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Car"
              username="Bob"
              dataImage={sampleImg2}
              onClick={() =>
                handleImageBoxClick({
                  dataImage: sampleImg2,
                  title: "Car",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Coke"
              username="Carol"
              dataImage={sampleImg3}
              onClick={() =>
                handleImageBoxClick({
                  dataImage: sampleImg3,
                  title: "Coke",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Cosmetic"
              username="Dave"
              dataImage={sampleImg4}
              onClick={() =>
                handleImageBoxClick({
                  dataImage: sampleImg4,
                  title: "Cosmetic",
                })
              }
            />
          </div>
        </div>
        <div className="others__video">
          <p>Videos from others</p>
          <div className="others__box">
            <Box
              width={310}
              height={204}
              title="Girl with Coke"
              username="Emma"
              dataImage={videoThumbnails[sampleVideo1]}
              onClick={() =>
                handleVideoBoxClick({
                  dataImage: sampleVideo1,
                  title: "Girl with Coke",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Alone"
              username="Frank"
              dataImage={videoThumbnails[sampleVideo5]}
              onClick={() =>
                handleVideoBoxClick({
                  dataImage: sampleVideo5,
                  title: "Alone",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Help people"
              username="Grace"
              dataImage={videoThumbnails[sampleVideo3]}
              onClick={() =>
                handleVideoBoxClick({
                  dataImage: sampleVideo3,
                  title: "Help people",
                })
              }
            />
            <Box
              width={310}
              height={204}
              title="Toy Play"
              username="Henry"
              dataImage={videoThumbnails[sampleVideo4]}
              onClick={() =>
                handleVideoBoxClick({
                  dataImage: sampleVideo4,
                  title: "Toy Play",
                })
              }
            />
          </div>
        </div>
      </div>

      <ModalImage
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        isCommunity={false}
      />

      <ModalVideo
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isCommunity={false}
      />
    </div>
  );
}

export default Home;