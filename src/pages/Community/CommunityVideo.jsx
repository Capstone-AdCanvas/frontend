import React from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityVideo.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";

const CommunityVideo = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/Community/image");
  };

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

export default CommunityVideo;
