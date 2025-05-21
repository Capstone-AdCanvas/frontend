import axios from "axios";

const IMAGE_GET_API = "http://localhost:8080/api/v1/image/user";

export const fetchUserImages = async (userId) => {
  try {
    const response = await axios.get(`${IMAGE_GET_API}/${userId}`);
    return response.data; // [{ id, userId, finalImage }]
  } catch (error) {
    console.error("회원 이미지 조회 실패:", error);
    return [];
  }
};
