import axios from "axios";

const IMAGE_GET_API = "http://localhost:8080/api/v1/image/user";
const IMAGE_ALL_API = "http://localhost:8080/api/v1/image"; // ✅ 추가

// 기존: 유저별 이미지 조회
export const fetchUserImages = async (userId) => {
  try {
    const response = await axios.get(`${IMAGE_GET_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("회원 이미지 조회 실패:", error);
    return [];
  }
};

// ✅ 새로 추가: 전체 이미지 조회
export const fetchAllImages = async () => {
  try {
    const response = await axios.get(IMAGE_ALL_API);
    return response.data;
  } catch (error) {
    console.error("전체 이미지 조회 실패:", error);
    return [];
  }
};
