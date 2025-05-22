import axios from "axios";

const VIDEO_BASE_URL = "http://localhost:8080/api/v1/videos";

// 현재 유저가 생성한 비디오만 조회
export const fetchUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${VIDEO_BASE_URL}/user`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("현재 유저 비디오 조회 실패:", error);
    return [];
  }
};

// 현재 유저를 제외한 전체 비디오 조회
export const fetchOtherVideos = async (userId) => {
  try {
    const response = await axios.get(`${VIDEO_BASE_URL}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("다른 유저 비디오 조회 실패:", error);
    return [];
  }
};
