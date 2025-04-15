import React from "react";
import { NavLink } from "react-router-dom";
import "./MiniSideMenuBar.css";

import homeImg from "../../assets/Home.png";
import communityImg from "../../assets/Community.png";
import aiImagesImg from "../../assets/AI Images.png";
import aiVideosImg from "../../assets/AI Videos.png";
import myCreativesImg from "../../assets/My Creatives.png";
import profileImg from "../../assets/Profile.png";

function MiniSideMenuBar() {
  return (
    <nav className="MiniSideMeuBar_miniSideMenuBar">
      <ul>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/home" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          >
            <img src={homeImg} alt="Home" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/Community" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          >
            <img src={communityImg} alt="Community" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/AiImages" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          >
            <img src={aiImagesImg} alt="AI Images" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/AiVideos" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          >
            <img src={aiVideosImg} alt="AI Videos" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/MyCreatives" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          > 
            <img src={myCreativesImg} alt="My Creatives" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
        <li className="MiniSideMeuBar_menu-item">
          <NavLink 
            to="/profile" 
            className={({ isActive }) => "MiniSideMeuBar_menu-link" + (isActive ? " MiniSideMeuBar_active" : "")}
          >
            <img src={profileImg} alt="Profile" className="MiniSideMeuBar_menu-icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MiniSideMenuBar;
