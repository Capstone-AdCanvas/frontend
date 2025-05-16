import { createContext, useState, useEffect } from "react";
import profileIcon from "../assets/profile-icon.png";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || profileIcon;
  });

  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("profileName") || "";
  });

  // ✅ 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("profileImage");
    localStorage.removeItem("profileName");
    setProfileImage(profileIcon);
    setProfileName("");
  };

  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem("profileName", profileName);
  }, [profileName]);

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        setProfileImage,
        profileName,
        setProfileName,
        logout, // 👈 로그아웃 추가
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
