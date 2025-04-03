import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";

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
      <div>
        <span></span>
        <div></div>
      </div>
    </section>
  );
};

export default MyCreativesVideo;
