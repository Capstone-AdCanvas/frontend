import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";

const MyCreativesVideo = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/MyCreatives/image");
  };

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
          <Box
            width={400}
            height={215}
            title="Video 1"
            userImage="https://via.placeholder.com/50"
            username="User1"
          />
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
    </section>
  );
};

export default MyCreativesVideo;
