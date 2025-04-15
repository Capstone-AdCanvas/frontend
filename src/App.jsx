///Users/wonjin/Desktop/AdCanvas/frontend/src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import OnBoarding from "./pages/OnBoarding/OnBoarding.jsx";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import SideMenubar from "./components/SideMenubar/SideMenubar.jsx";
import MiniSideMenuBar from "./components/MiniSideMenuBar/MinisideMenuBar.jsx";
import "./App.css";

function AppLayout() {
  const location = useLocation();

  // 조건: MiniSideMenuBar를 보여줄 경로
  const miniSidebarRoutes = ["/AiImages", "/AiVideos"];
  const isMiniSidebar = miniSidebarRoutes.includes(location.pathname);

  // 조건: Header와 Layout을 숨길 경로
  const isFullScreenPage =
    location.pathname === "/" ||
    location.pathname === "/onboarding" ||
    location.pathname === "/login";

  if (isFullScreenPage) {
    return (
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="main">
      {isMiniSidebar ? <MiniSideMenuBar /> : <SideMenubar />}
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
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
  const location = useLocation();
  const isFullScreenPage =
    location.pathname === "/" ||
    location.pathname === "/onboarding" ||
    location.pathname === "/login";

  return (
    <div className="app">
      {!isFullScreenPage && <Header />}
      <AppLayout />
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
