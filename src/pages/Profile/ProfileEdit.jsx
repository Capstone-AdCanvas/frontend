import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import editIcon from "../../assets/profile-edit-btn-2.png";
import profileIcon from "../../assets/profile-icon.png";
import instaIcon from "../../assets/profile-insta-icon.png";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/profile");
  };

  return (
    <section className="profileEditPage">
      <h2 className="profileEditPage__title">My Profile</h2>
      <article className="profileEditPage__content">
        <div
          className="profileEditPage__content__btn"
          onClick={handleBackClick}
        >
          <img src={editIcon} alt="프로필 수정 버튼" />
        </div>
        <div className="profileEditPage__content__image">
          <img src={profileIcon} alt="" />
        </div>
        <button className="profileEditPage__content__imageEdit">
          사진 변경하기
        </button>
        <div className="profileEditPage__content__info">
          <div className="profileEditPage__content__info__name">
            닉네임:
            <span className="profileEditPage__content__info__name__nickname">
              Chill guy
            </span>
          </div>
          <div className="profileEditPage__content__info__btn">
            <button className="profileEditPage__content__info__btn__image">
              Image <span>3</span>
            </button>
            <button className="profileEditPage__content__info__btn__video">
              Video <span>2</span>
            </button>
          </div>
          <div className="profileEditPage__content__info__insta">
            <img src={instaIcon} alt="" />
            <button className="profileEditPage__content__info__insta__login">
              다른 아이디 연동하기
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfileEdit;
