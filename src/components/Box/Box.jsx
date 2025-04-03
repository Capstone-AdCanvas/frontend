import React from "react";
import "./Box.css";

function Box({ width = 291, height = 204, title, userImage, username }) {
  return (
    <div className="box" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="box__content">
        {/* 실제 이미지나 영상 대신 빈 박스 */}
      </div>
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
