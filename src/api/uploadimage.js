import axios from "axios";

const IMAGE_UPLOAD_API = "http://localhost:8080/api/v1/image/upload";

export const postSampleImages = async (userId, imageFiles) => {
  try {
    const formDataList = imageFiles.map((file) => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("image", file);
      return formData;
    });

    const uploadResponses = await Promise.all(
      formDataList.map((formData) =>
        axios.post(IMAGE_UPLOAD_API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      )
    );

    return uploadResponses.map((res) => res.data);
  } catch (error) {
    console.error("샘플 이미지 업로드 실패:", error);
    throw error;
  }
};
