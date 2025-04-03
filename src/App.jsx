import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Community from "./pages/Community/Community.jsx";
import AiImages from "./pages/AiImages/AiImages.jsx";
import AiVideos from "./pages/AiVideos/AiVideos.jsx";
import MyCreatives from "./pages/MyCreatives/MyCreatives.jsx";
import MyCreativesImage from "./pages/MyCreatives/MyCreativesImage.jsx";
import MyCreativesVideo from "./pages/MyCreatives/MyCreativesVideo.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Header from "./components/Header/Header.jsx";
import SideMenubar from "./components/SideMenubar/SideMenubar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <SideMenubar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Community" element={<Community />} />
              <Route path="/AiImages" element={<AiImages />} />
              <Route path="/AiVideos" element={<AiVideos />} />
              <Route path="/MyCreatives" element={<MyCreatives />} />
              <Route path="/MyCreatives/image" element={<MyCreativesImage />} />
              <Route path="/MyCreatives/video" element={<MyCreativesVideo />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
