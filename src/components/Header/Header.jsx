import React from "react";
import "./Header.css";

import logoImg from "../../assets/react.svg";
import profileImg from "../../assets/프로필이미지.png";

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <div className="siteName">AdCanvas</div>
      </div>
      <div className="profile">
        <img src={profileImg} alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
