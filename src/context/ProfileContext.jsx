import { createContext, useState, useEffect } from "react";
import profileIcon from "../assets/profile-icon.png";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("profileName") || "";
  });

  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });

  const getStoredImage = (email) => {
    const stored = localStorage.getItem("userProfileImages");
    const images = stored ? JSON.parse(stored) : {};
    return images[email] || profileIcon;
  };

  const [profileImage, setProfileImage] = useState(() =>
    getStoredImage(localStorage.getItem("email"))
  );

  useEffect(() => {
    localStorage.setItem("profileName", profileName);
  }, [profileName]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    if (email) {
      const stored = localStorage.getItem("userProfileImages");
      const images = stored ? JSON.parse(stored) : {};
      images[email] = profileImage;
      localStorage.setItem("userProfileImages", JSON.stringify(images));
    }
  }, [profileImage, email]);

  const logout = () => {
    localStorage.removeItem("profileName");
    localStorage.removeItem("email");
    setProfileName("");
    setEmail("");
    setProfileImage(profileIcon); // 기본 이미지로 초기화
  };

  return (
    <ProfileContext.Provider
      value={{
        profileName,
        setProfileName,
        profileImage,
        setProfileImage,
        email,
        setEmail,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
