import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import editIcon from "../../assets/profile-edit-btn-1.png";
import editIcon2 from "../../assets/profile-edit-btn-2.png";
import profileIcon from "../../assets/profile-icon.png";
import instaIcon from "../../assets/profile-insta-icon.png";
import GradientBox from "../../components/GradientBox/GradientBox";
import imageIcon from "../../assets/AI Images.png";
import uploadIcon from "../../assets/uploadIcon.png";
import { ProfileContext } from "../../context/ProfileContext";

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  // const [profileImage, setProfileImage] = useState(profileIcon);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { profileImage, setProfileImage } = useContext(ProfileContext);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleClick = () => fileInputRef.current.click();
  const handleChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleFile = (file) => {
    const allowed = ["image/jpeg", "image/png"];
    if (file && allowed.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowImageUploader(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("JPG 또는 PNG 이미지 파일만 업로드할 수 있습니다.");
    }
  };

  const handleImageClick = () => {
    navigate("/MyCreatives/image");
  };
  const handleVideoClick = () => {
    navigate("/MyCreatives/video");
  };

  return (
    <section className="profilePage">
      <h2 className="profilePage__title">My Profile</h2>
      <article className="profilePage__content">
        <div className="profilePage__content__btn" onClick={toggleEditMode}>
          <img src={isEditMode ? editIcon2 : editIcon} alt="프로필 수정 버튼" />
        </div>
        <div className="profilePage__content__image">
          <img src={profileImage} alt="프로필 이미지" />
        </div>

        {isEditMode && (
          <>
            <button
              className="profilePage__content__imageEdit"
              onClick={() => setShowImageUploader(true)}
            >
              사진 변경하기
            </button>

            {showImageUploader && (
              <div className="profilePage-imageUploadModalOverlay">
                <div className="profilePage-imageUploadModalContent">
                  <GradientBox
                    width={"600px"}
                    height={"350px"}
                    className="profilePage-image-upload-box-gradient"
                  >
                    <div className="profilePage-image-upload">
                      <img src={imageIcon} alt="AI Upload" />
                      <h2>이미지 업로드</h2>
                    </div>

                    <div
                      className="profilePage-upload-box"
                      onClick={handleClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <div className="profilePage-upload-content">
                        <img
                          src={uploadIcon}
                          alt="Upload Icon"
                          className="upload-icon"
                        />
                        <span>Click to Upload or drag and drop</span>
                      </div>
                      <div className="profilePage-upload-support">
                        Support JPG/PNG Files
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        ref={fileInputRef}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </GradientBox>
                  <button
                    className="profilePage-imageUploadModal-closeButton"
                    onClick={() => setShowImageUploader(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="profilePage__content__info">
          <div className="profilePage__content__info__name">
            닉네임:
            <span className="profilePage__content__info__name__nickname">
              Chill guy
            </span>
          </div>
          <div className="profilePage__content__info__btn">
            <button
              className="profilePage__content__info__btn__image"
              onClick={handleImageClick}
            >
              Image <span>3</span>
            </button>
            <button
              className="profilePage__content__info__btn__video"
              onClick={handleVideoClick}
            >
              Video <span>2</span>
            </button>
          </div>

          {/* <div className="profilePage__content__info__insta">
            <img src={instaIcon} alt="인스타 아이콘" />
            {isEditMode ? (
              <button className="profilePage__content__info__insta__login">
                다른 아이디 연동하기
              </button>
            ) : (
              <span className="profilePage__content__info__insta__name">
                chill_guy
              </span>
            )}
          </div> */}
        </div>
      </article>
    </section>
  );
}

export default Profile;
