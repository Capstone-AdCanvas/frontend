import { createContext, useState, useEffect } from "react";
import profileIcon from "../assets/profile-icon.png";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [id, setId] = useState(() => {
    return localStorage.getItem("id") || "";
  });

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
    localStorage.setItem("id", id); // ✅ "id"라는 key로 저장
  }, [id]);

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
    localStorage.removeItem("id"); // ✅ 로그아웃 시 "id" 삭제
    localStorage.removeItem("profileName");
    localStorage.removeItem("email");
    setId("");
    setProfileName("");
    setEmail("");
    setProfileImage(profileIcon);
  };

  return (
    <ProfileContext.Provider
      value={{
        id,
        setId,
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
