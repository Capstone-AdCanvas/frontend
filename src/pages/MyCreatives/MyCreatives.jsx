import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreatives.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";

function MyCreatives() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/MyCreatives/image");
  };
  const handleVideoClick = () => {
    navigate("/MyCreatives/video");
  };

  return (
    <section className="mycreativesPage">
      <header className="mycreativesPage__header">
        <article className="mycreativesPage__image" onClick={handleImageClick}>
          <h2>My AI Image</h2>
          <span>Check my AI image</span>
          <div className="mycreativesPage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article className="mycreativesPage__video" onClick={handleVideoClick}>
          <h2>My AI Video</h2>
          <span>Check my AI video</span>
          <div className="mycreativesPage__video__image">
            <img src={videoPicture} alt="" />
          </div>
        </article>
      </header>
    </section>
  );
}

export default MyCreatives;
