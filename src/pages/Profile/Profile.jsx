import { useState } from "react";
import "./Profile.css";
import editIcon from "../../assets/profile-edit-btn-1.png";
import editIcon2 from "../../assets/profile-edit-btn-2.png";
import profileIcon from "../../assets/profile-icon.png";
import instaIcon from "../../assets/profile-insta-icon.png";

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <section className="profilePage">
      <h2 className="profilePage__title">My Profile</h2>
      <article className="profilePage__content">
        <div className="profilePage__content__btn" onClick={toggleEditMode}>
          <img src={isEditMode ? editIcon2 : editIcon} alt="프로필 수정 버튼" />
        </div>
        <div className="profilePage__content__image">
          <img src={profileIcon} alt="" />
        </div>

        {isEditMode && (
          <button className="profilePage__content__imageEdit">
            사진 변경하기
          </button>
        )}

        <div className="profilePage__content__info">
          <div className="profilePage__content__info__name">
            닉네임:
            <span className="profilePage__content__info__name__nickname">
              Chill guy
            </span>
          </div>
          <div className="profilePage__content__info__btn">
            <button className="profilePage__content__info__btn__image">
              Image <span>3</span>
            </button>
            <button className="profilePage__content__info__btn__video">
              Video <span>2</span>
            </button>
          </div>

          <div className="profilePage__content__info__insta">
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
          </div>
        </div>
      </article>
    </section>
  );
}

export default Profile;
