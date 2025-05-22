import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityImage.css";
import imagePicture from "../../assets/mycreatives-image-1.png";
import videoPicture from "../../assets/mycreatives-video-1.png";
import Box from "../../components/Box/Box";
import userIcon from "../../assets/profile-icon.png";
import ModalImage from "../../components/ModalImage/ModalImage";
import { fetchAllImages } from "../../api/checkimage";
import { fetchUserInfoById } from "../../api/user";

const CommunityImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("id")); // ✅ 현재 로그인한 유저 ID

  const handleVideoClick = () => {
    navigate("/Community/video");
  };

  const handleBoxClick = (imageData) => {
    const img = new Image();
    img.src = imageData.dataImage;

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const extension = imageData.dataImage.split(".").pop().split("?")[0];

      setSelectedImage({
        ...imageData,
        size: `${width} x ${height}`,
        extension,
      });
    };
  };

  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      const images = await fetchAllImages(userId); // ✅ userId 전달
      setAllImages(images);

      const localProfileImages = JSON.parse(
        localStorage.getItem("userProfileImages") || "{}"
      );

      const localUserMap = {};
      const uniqueUserIds = [...new Set(images.map((img) => img.userId))];

      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const userInfo = await fetchUserInfoById(userId);
          const emailKey = userInfo?.email;
          localUserMap[userId] = {
            profileName: userInfo?.name || `User ${userId}`,
            profileImage: localProfileImages[emailKey] || userIcon,
          };
        })
      );

      setUserMap(localUserMap);
    };

    fetchData();
  }, [userId]);

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
          {allImages.map((img, idx) => {
            const profileName =
              userMap[img.userId]?.profileName || `User ${img.userId}`;
            const profileImage = userMap[img.userId]?.profileImage || userIcon;
            console.log(img);
            return (
              <Box
                key={idx}
                width={400}
                height={215}
                title={img.name || `커뮤니티 이미지 ${idx + 1}`}
                userImage={profileImage}
                username={profileName}
                dataImage={img.finalImage || img.originalImage}
                onClick={() =>
                  handleBoxClick({
                    dataImage: img.finalImage || img.originalImage,
                    title: img.name || `커뮤니티 이미지 ${idx + 1}`,
                    username: profileName,
                  })
                }
              />
            );
          })}
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
