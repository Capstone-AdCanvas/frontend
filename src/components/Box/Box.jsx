import React from "react";
import "./Box.css";

function Box({
  width = 291,
  height = 204,
  title,
  userImage,
  username,
  dataImage,
  onClick,
}) {
  return (
    <div
      className="box"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={dataImage ? onClick : undefined} // dataImage가 있을 때만 클릭 활성화
    >
      <div
        className="box__content"
        style={{ backgroundImage: dataImage ? `url(${dataImage})` : "none" }}
      />
      <div className="box__info">
        <span className="box__title">{title}</span>
        <div className="box__user">
          <img className="box__user-image" src={userImage} alt="User" />
          <span className="box__username">{username}</span>
        </div>
      </div>
    </div>
  );
}

export default Box;
