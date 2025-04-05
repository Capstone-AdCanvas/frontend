import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Community from "./pages/Community/Community.jsx";
import CommunityImage from "./pages/Community/CommunityImage.jsx";
import CommunityVideo from "./pages/Community/CommunityVideo.jsx";
import AiImages from "./pages/AiImages/AiImages.jsx";
import AiVideos from "./pages/AiVideos/AiVideos.jsx";
import MyCreatives from "./pages/MyCreatives/MyCreatives.jsx";
import MyCreativesImage from "./pages/MyCreatives/MyCreativesImage.jsx";
import MyCreativesVideo from "./pages/MyCreatives/MyCreativesVideo.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Header from "./components/Header/Header.jsx";
import SideMenubar from "./components/SideMenubar/SideMenubar.jsx";
import MiniSideMenuBar from "./components/MiniSideMenuBar/MinisideMenuBar.jsx";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  // AI Images와 AI Videos 페이지에서는 미니 사이드메뉴바 사용
  const miniSidebarRoutes = ["/AiImages", "/AiVideos"];
  const isMiniSidebar = miniSidebarRoutes.includes(location.pathname);

  return (
    <div className="main">
      {isMiniSidebar ? <MiniSideMenuBar /> : <SideMenubar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Community/image" element={<CommunityImage />} />
          <Route path="/Community/video" element={<CommunityVideo />} />
          <Route path="/AiImages" element={<AiImages />} />
          <Route path="/AiVideos" element={<AiVideos />} />
          <Route path="/MyCreatives" element={<MyCreatives />} />
          <Route path="/MyCreatives/image" element={<MyCreativesImage />} />
          <Route path="/MyCreatives/video" element={<MyCreativesVideo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <AppLayout />
      </div>
    </Router>
  );
}

export default App;
