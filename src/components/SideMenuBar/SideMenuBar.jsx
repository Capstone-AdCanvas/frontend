// frontend/src/components/SideMenubar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenubar.css";

import homeImg from "../../assets/Home.png";
import communityImg from "../../assets/Community.png";
import aiImagesImg from "../../assets/AI Images.png";
import aiVideosImg from "../../assets/AI Videos.png";
import myCreativesImg from "../../assets/My Creatives.png";

function SideMenubar() {
  return (
    <nav className="sideMenubar">
      <ul>
        <li className="menu-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => "menu-link" + (isActive ? " active" : "")}
          >
            <div className="menu-indicator"></div>
            <img src={homeImg} alt="Home" className="menu-icon" />
            <span className="menu-text">Home</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/Community" 
            className={({ isActive }) => "menu-link" + (isActive ? " active" : "")}
          >
            <div className="menu-indicator"></div>
            <img src={communityImg} alt="Community" className="menu-icon" />
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
            className={({ isActive }) => "menu-link" + (isActive ? " active" : "")}
          >
            <div className="menu-indicator"></div>
            <img src={aiImagesImg} alt="AI Images" className="menu-icon" />
            <span className="menu-text">AI Images</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/AiVideos" 
            className={({ isActive }) => "menu-link" + (isActive ? " active" : "")}
          >
            <div className="menu-indicator"></div>
            <img src={aiVideosImg} alt="AI Videos" className="menu-icon" />
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
            className={({ isActive }) => "menu-link" + (isActive ? " active" : "")}
          >
            <div className="menu-indicator"></div>
            <img src={myCreativesImg} alt="My Creatives" className="menu-icon" />
            <span className="menu-text">My Creatives</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenubar;
