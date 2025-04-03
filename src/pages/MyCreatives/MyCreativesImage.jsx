import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";

const MyCreativesImage = () => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/MyCreatives/video");
  };

  return (
    <section className="mycreativesImagePage">
      <header className="mycreativesImagePage__header">
        <article className="mycreativesImagePage__image">
          <h2>My AI Image</h2>
          <span>Check my Ai image</span>
          <div className="mycreativesImagePage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article
          className="mycreativesImagePage__video"
          onClick={handleVideoClick}
        >
          <h2>My AI Video</h2>
          <span>Check my Ai video</span>
          <div className="mycreativesImagePage__video__image">
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

export default MyCreativesImage;
