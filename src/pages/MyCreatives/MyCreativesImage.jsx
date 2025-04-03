import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";

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
      <div className="mycreativesImagePage__contents">
        <span className="mycreativesImagePage__contents__title">
          My AI Images
        </span>
        <div className="mycreativesImagePage__contents__image">
          <Box
            width={400}
            height={215}
            title="Image 1"
            userImage="https://via.placeholder.com/50"
            username="User1"
          />
          <Box
            width={400}
            height={215}
            title="Image 2"
            userImage="https://via.placeholder.com/50"
            username="User2"
          />
          <Box
            width={400}
            height={215}
            title="Image 3"
            userImage="https://via.placeholder.com/50"
            username="User3"
          />
          <Box
            width={400}
            height={215}
            title="Image 4"
            userImage="https://via.placeholder.com/50"
            username="User4"
          />
          <Box
            width={400}
            height={215}
            title="Image 5"
            userImage="https://via.placeholder.com/50"
            username="User5"
          />
          <Box
            width={400}
            height={215}
            title="Image 6"
            userImage="https://via.placeholder.com/50"
            username="User6"
          />
        </div>
      </div>
    </section>
  );
};

export default MyCreativesImage;
