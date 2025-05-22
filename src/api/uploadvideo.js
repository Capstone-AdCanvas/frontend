import axios from "axios";

const VIDEO_UPLOAD_API = "http://localhost:8080/api/v1/videos";

export const uploadVideo = async (userId, videoData) => {
  try {
    const response = await axios.post(
      `${VIDEO_UPLOAD_API}/${userId}`,
      videoData
    );
    return response.data;
  } catch (error) {
    console.error("비디오 업로드 실패:", error);
    throw error.response?.data || { message: "비디오 업로드 중 오류 발생" };
  }
};
