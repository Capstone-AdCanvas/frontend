///Users/wonjin/Desktop/AdCanvas/frontend/src/App.jsx

import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { ProfileContext, ProfileProvider } from "./context/ProfileContext.jsx";

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
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/Community"
            element={
              <RequireAuth>
                <Community />
              </RequireAuth>
            }
          />
          <Route
            path="/Community/image"
            element={
              <RequireAuth>
                <CommunityImage />
              </RequireAuth>
            }
          />
          <Route
            path="/Community/video"
            element={
              <RequireAuth>
                <CommunityVideo />
              </RequireAuth>
            }
          />
          <Route
            path="/AiImages"
            element={
              <RequireAuth>
                <AiImages />
              </RequireAuth>
            }
          />
          <Route
            path="/AiVideos"
            element={
              <RequireAuth>
                <AiVideos />
              </RequireAuth>
            }
          />
          <Route
            path="/MyCreatives"
            element={
              <RequireAuth>
                <MyCreatives />
              </RequireAuth>
            }
          />
          <Route
            path="/MyCreatives/image"
            element={
              <RequireAuth>
                <MyCreativesImage />
              </RequireAuth>
            }
          />
          <Route
            path="/MyCreatives/video"
            element={
              <RequireAuth>
                <MyCreativesVideo />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
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
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </Router>
  );
}

function RequireAuth({ children }) {
  const { id } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [id, navigate]);

  return id ? children : null;
}

export default AppWithRouter;
