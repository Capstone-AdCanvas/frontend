import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import dummyImage from "../../assets/dummyimage.png";
import ModalImage from "../../components/ModalImage/ModalImage";
import { ProfileContext } from "../../context/ProfileContext";
import { fetchUserImages } from "../../api/checkimage";

const MyCreativesImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const { id, profileName, profileImage } = useContext(ProfileContext);

  const handleVideoClick = () => {
    navigate("/MyCreatives/video");
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

  useEffect(() => {
    if (id) {
      fetchUserImages(id).then((images) => {
        const filteredImages = images.filter(
          (img) => String(img.userId) === "5"
        );
        setUserImages(filteredImages);

        console.log("fetchUserImages 응답 확인:", images);
      });
    }
  }, [id]);

  const isAuthorizedUser = userImages.length > 0; // id === 5 유저가 아니면 자동으로 빈 배열

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
          {isAuthorizedUser &&
            userImages.map((img, idx) => (
              <Box
                key={idx}
                width={400}
                height={215}
                title={`샘플 이미지 ${idx + 1}`}
                userImage={profileImage}
                username={profileName}
                dataImage={img.finalImage || img.originalImage} // ✅ 핵심 수정
                onClick={() =>
                  handleBoxClick({
                    dataImage: img.finalImage || img.originalImage,
                    title: `샘플 이미지 ${idx + 1}`,
                  })
                }
              />
            ))}
        </div>
      </div>

      <ModalImage
        image={selectedImage}
        onClose={closeModal}
        isCommunity={false}
      />
    </section>
  );
};

export default MyCreativesImage;
