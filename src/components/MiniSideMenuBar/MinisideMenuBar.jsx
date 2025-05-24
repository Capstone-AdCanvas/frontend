import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./MiniSideMenuBar.css";

import homeImg from "../../assets/Home.png";
import communityImg from "../../assets/Community.png";
import aiImagesImg from "../../assets/AI Images.png";
import aiVideosImg from "../../assets/AI Videos.png";
import myCreativesImg from "../../assets/My Creatives.png";
import profileImg from "../../assets/Profile.png";
import HelpImg from "../../assets/Help.png";
import LogoutImg from "../../assets/Logout.png";
import Help from "../subcomponents/Help/Help";

import { ProfileContext } from "../../context/ProfileContext";
import { AnimatePresence, motion } from "framer-motion";
import { animation } from "../../styles/motion";

function MiniSideMenuBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showHelp, setShowHelp] = useState(false);
  const { logout } = useContext(ProfileContext);

  const isCurrent = (path) => currentPath.startsWith(path);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="MiniSideMeuBar_miniSideMenuBar">
        <ul>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={homeImg}
                alt="Home"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/home")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/Community"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={communityImg}
                alt="Community"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/Community")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/AiImages"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={aiImagesImg}
                alt="AI Images"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/AiImages")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/AiVideos"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={aiVideosImg}
                alt="AI Videos"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/AiVideos")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/MyCreatives"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={myCreativesImg}
                alt="My Creatives"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/MyCreatives")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
          <li className="MiniSideMeuBar_menu-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                "MiniSideMeuBar_menu-link" +
                (isActive ? " MiniSideMeuBar_active" : "")
              }
            >
              <img
                src={profileImg}
                alt="Profile"
                className="MiniSideMeuBar_menu-icon"
                style={
                  !isCurrent("/profile")
                    ? { filter: "brightness(0) invert(1)" }
                    : {}
                }
              />
            </NavLink>
          </li>
        </ul>

        <ul>
          <li
            className={`MiniSideMeuBar_menu-item${
              showHelp ? " MiniSideMeuBar_active" : ""
            }`}
            onClick={() => setShowHelp((prev) => !prev)}
          >
            <div className="MiniSideMeuBar_menu-link">
              <img
                src={HelpImg}
                alt="Help"
                className="MiniSideMeuBar_menu-icon"
                style={!showHelp ? { filter: "brightness(0) invert(1)" } : {}}
              />
            </div>
          </li>

          <li className="MiniSideMeuBar_menu-item" onClick={handleLogout}>
            <NavLink to="/login" className="MiniSideMeuBar_menu-link">
              <img
                src={LogoutImg}
                alt="Logout"
                className="MiniSideMeuBar_menu-icon"
              />
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Help 패널 - 사이드바 밖에 위치 */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="MiniSideMeuBar_help-panel"
            variants={animation.fadeInSlideRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Help />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MiniSideMenuBar;
