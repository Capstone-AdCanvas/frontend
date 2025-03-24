// frontend/src/components/Header.jsx
import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div className="site-name">사이트 이름</div>
      <div className="profile">
        {/* 사용자 프로필 이미지 경로를 실제 경로로 변경 */}
        <img src="/images/profile.png" alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
