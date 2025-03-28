import "./Profile.css";
import editIcon from "../../assets/profile-edit-btn-1.png";
import profileIcon from "../../assets/profile-icon.png";
import instaIcon from "../../assets/profile-insta-icon.png";

function Profile() {
  return (
    <section className="profilePage">
      <h2 className="profilePage__title">My Profile</h2>
      <article className="profilePage__content">
        <div className="profilePage__content__btn">
          <img src={editIcon} alt="프로필 수정 버튼" />
        </div>
        <div className="profilePage__content__image">
          <img src={profileIcon} alt="" />
        </div>
        <div className="profilePage__content__info">
          <div className="profilePage__content__info__name">
            닉네임:
            <span className="profilePage__content__info__name__nickname">
              Chill guy
            </span>
          </div>
          <div className="profilePage__content__info__btn">
            <button className="profilePage__content__info__btn__image">
              Image 3
            </button>
            <button className="profilePage__content__info__btn__video">
              Video 2
            </button>
          </div>
          <div className="profilePage__content__info__insta">
            <img src={instaIcon} alt="" />
            <span className="profilePage__content__info__insta__name">
              chill_guy
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Profile;
