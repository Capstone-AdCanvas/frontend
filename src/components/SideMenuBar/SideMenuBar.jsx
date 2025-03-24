// frontend/src/components/SideMenubar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SideMenubar.css";

function SideMenubar() {
  return (
    <nav className="sideMenubar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Community">Community</Link>
        </li>
        <li>
          <Link to="/AiImages">Ai Images</Link>
        </li>
        <li>
          <Link to="/AiVideos">Ai Videos</Link>
        </li>
        <li>
          <Link to="/MyCreatives">My Creatives</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenubar;
