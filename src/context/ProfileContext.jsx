import { createContext, useState } from "react";
import profileIcon from "../assets/profile-icon.png"; // 기본 이미지

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(profileIcon);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
