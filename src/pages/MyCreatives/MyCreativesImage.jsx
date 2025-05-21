import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCreativesImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import ModalImage from "../../components/ModalImage/ModalImage";
import { fetchUserImages } from "../../api/checkimage";
import { fetchUserInfoById } from "../../api/user";

const MyCreativesImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(userIcon);
  const userId = localStorage.getItem("id");

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
    const fetchData = async () => {
      if (userId) {
        const userInfo = await fetchUserInfoById(userId);
        const images = await fetchUserImages(userId);

        setUserImages(images);
        setProfileName(userInfo?.name || `User ${userId}`);

        const profileImageMap = JSON.parse(
          localStorage.getItem("userProfileImages") || "{}"
        );
        const image = profileImageMap[userInfo?.email] || userIcon;
        setProfileImage(image);
      }
    };

    fetchData();
  }, [userId]);

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
          {userImages.map((img, idx) => (
            <Box
              key={idx}
              width={400}
              height={215}
              title={`샘플 이미지 ${idx + 1}`}
              userImage={profileImage} // ✅ 로컬스토리지 기반
              username={profileName} // ✅ API 기반 이름
              dataImage={img.finalImage || img.originalImage}
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
