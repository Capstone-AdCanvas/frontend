import React, { useContext } from "react";
import "./Header.css";

import logoImg from "../../assets/adcanvas-logo.png";
import { ProfileContext } from "../../context/ProfileContext";

function Header() {
  const { profileImage } = useContext(ProfileContext);

  return (
    <header className="header">
      <div className="brand">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <div className="siteName">AdCanvas</div>
      </div>
      <div className="profile">
        <img src={profileImage} alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
