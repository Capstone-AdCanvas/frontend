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

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // 사용자 목록 배열
  } catch (error) {
    console.error("전체 유저 조회 실패", error);
    throw error;
  }
};
