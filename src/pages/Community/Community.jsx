import React from "react";
import { useNavigate } from "react-router-dom";
import "./Community.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";

function Community() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/Community/image");
  };
  const handleVideoClick = () => {
    navigate("/Community/video");
  };

  return (
    <section className="communityPage">
      <header className="communityPage__header">
        <article className="communityPage__image" onClick={handleImageClick}>
          <h2>Other's AI Image</h2>
          <span>View other people's AI image</span>
          <div className="communityPage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article className="communityPage__video" onClick={handleVideoClick}>
          <h2>Other's AI Video</h2>
          <span>View other people's AI video</span>
          <div className="communityPage__video__image">
            <img src={videoPicture} alt="" />
          </div>
        </article>
      </header>
    </section>
  );
}

export default Community;
