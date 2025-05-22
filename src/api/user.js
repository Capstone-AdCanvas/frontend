import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Network or Unknown Error:", error);
      throw { message: "서버와 연결할 수 없습니다." };
    }
  }
};

// 🔄 로그인 요청 API 추가
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Login Error:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Network or Unknown Error:", error);
      throw { message: "서버와 연결할 수 없습니다." };
    }
  }
};

export const fetchUserInfoById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data; // { id, name, email, ... }
  } catch (error) {
    console.error(`유저 정보 가져오기 실패 (id: ${userId})`, error);
    return null;
  }
};
