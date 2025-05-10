import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import dummyImage from "../../assets/dummyimage.png";
import ModalImage from "../../components/ModalImage/ModalImage";

const CommunityImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleVideoClick = () => {
    navigate("/Community/video");
  };

  const handleBoxClick = (imageData) => {
    const img = new Image();
    img.src = imageData.dataImage;

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // 확장자 추출
      const extension = imageData.dataImage.split(".").pop().split("?")[0];

      setSelectedImage({
        ...imageData,
        size: `${width} x ${height}`,
        extension,
      });
    };
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="communityImagePage">
      <header className="communityImagePage__header">
        <article className="communityImagePage__image">
          <h2>Other's AI Image</h2>
          <span>
            View other people's
            <br />
            AI image
          </span>
          <div className="communityImagePage__image__image">
            <img src={imagePicture} alt="" />
          </div>
        </article>
        <article
          className="communityImagePage__video"
          onClick={handleVideoClick}
        >
          <h2>Other's AI Video</h2>
          <span>
            View other people's
            <br />
            AI video
          </span>
          <div className="communityImagePage__video__image">
            <img src={videoPicture} alt="" />
          </div>
        </article>
      </header>
      <div className="communityImagePage__contents">
        <span className="communityImagePage__contents__title">
          Others's AI Image
          <br />
          Contents
        </span>
        <div className="communityImagePage__contents__image">
          <Box
            width={400}
            height={215}
            title="향수병"
            userImage={userIcon}
            username="Chill guy"
            dataImage={dummyImage}
            onClick={() =>
              handleBoxClick({
                dataImage: dummyImage,
                title: "향수병",
                username: "Chill guy",
              })
            }
          />
          {/* Other boxes omitted for brevity */}
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

      <ModalImage
        image={selectedImage}
        onClose={closeModal}
        isCommunity={true}
      />
    </section>
  );
};

export default CommunityImage;
