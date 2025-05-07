import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SideMenubar.css";

import homeImg from "../../assets/Home.png";
import communityImg from "../../assets/Community.png";
import aiImagesImg from "../../assets/AI Images.png";
import aiVideosImg from "../../assets/AI Videos.png";
import myCreativesImg from "../../assets/My Creatives.png";
import profileImg from "../../assets/Profile.png";
import HelpImg from "../../assets/Help.png";
import LogoutImg from "../../assets/Logout.png";
import Help from "../subcomponents/Help/Help";

function SideMenubar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showHelp, setShowHelp] = useState(false);

  // 유틸: 현재 경로가 메뉴 경로와 일치하는지 확인
  const isCurrent = (path) => currentPath.startsWith(path);

  return (
    <nav className="sideMenubar">
      <ul>
        <li className="menu-item">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={homeImg}
              alt="Home"
              className="menu-icon"
              style={
                !isCurrent("/home") ? { filter: "brightness(0) invert(1)" } : {}
              }
            />
            <span className="menu-text">Home</span>
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink
            to="/Community"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={communityImg}
              alt="Community"
              className="menu-icon"
              style={
                !isCurrent("/Community")
                  ? { filter: "brightness(0) invert(1)" }
                  : {}
              }
            />
            <span className="menu-text">Community</span>
          </NavLink>
        </li>

        {/* Separator: Create 카테고리 */}
        <li className="separator">
          <div className="separator-line"></div>
          <div className="separator-text">Create</div>
        </li>

        <li className="menu-item">
          <NavLink
            to="/AiImages"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={aiImagesImg}
              alt="AI Images"
              className="menu-icon"
              style={
                !isCurrent("/AiImages")
                  ? { filter: "brightness(0) invert(1)" }
                  : {}
              }
            />
            <span className="menu-text">AI Images</span>
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink
            to="/AiVideos"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={aiVideosImg}
              alt="AI Videos"
              className="menu-icon"
              style={
                !isCurrent("/AiVideos")
                  ? { filter: "brightness(0) invert(1)" }
                  : {}
              }
            />
            <span className="menu-text">AI Videos</span>
          </NavLink>
        </li>

        {/* Separator: My Space 카테고리 */}
        <li className="separator">
          <div className="separator-line"></div>
          <div className="separator-text">My Space</div>
        </li>

        <li className="menu-item">
          <NavLink
            to="/MyCreatives"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={myCreativesImg}
              alt="My Creatives"
              className="menu-icon"
              style={
                !isCurrent("/MyCreatives")
                  ? { filter: "brightness(0) invert(1)" }
                  : {}
              }
            />
            <span className="menu-text">My Creatives</span>
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img
              src={profileImg}
              alt="Profile"
              className="menu-icon"
              style={
                !isCurrent("/profile")
                  ? { filter: "brightness(0) invert(1)" }
                  : {}
              }
            />
            <span className="menu-text">Profile</span>
          </NavLink>
        </li>
      </ul>
      <ul>
        {/* Separator: 기타 카테고리 */}
        <li className="separator">
          <div className="separator-line"></div>
        </li>

        {showHelp && (
          <li className="help-popup-item">
            <Help />
          </li>
        )}
        <li
          className="menu-item"
          onClick={() => setShowHelp((prev) => !prev)} // ✅ 클릭 시 toggle
        >
          <div className="menu-indicator"></div>
          <img
            src={HelpImg}
            alt="Help"
            className="menu-icon"
            style={!showHelp ? { filter: "brightness(0) invert(1)" } : {}}
          />
          <span className="menu-text">Help</span>
        </li>
        {/* 일단 Logout Account만 만들고 나중에 로그인 연동을 하면, 로그인 여부에 따라서 Login Account/Logout Account로 구현하면 될 것같음 */}
        <li className="menu-item">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <div className="menu-indicator"></div>
            <img src={LogoutImg} alt="Logout" className="menu-icon" />
            <span className="menu-text">Logout Account</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenubar;
