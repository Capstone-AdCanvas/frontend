import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/image";

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", "1");

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const removeBackground = async (imageId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bg/${imageId}/remove`, {
      userId: 3,
    });
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

export const generateBackground = async (imageId, conceptOption) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bg/${imageId}/generate`,
      {
        concept_option: conceptOption.toUpperCase(),
      }
    );
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

export const generateCustomBackground = async (imageId, customPrompt) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bg/${imageId}/custom-generate`,
      {
        customPrompt: customPrompt,
      }
    );
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

export const selectFinalImage = async (imageId, fileName) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bg/${imageId}/select-finalImage`,
      { fileName }
    );
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

export const uploadLogo = async (logoFile) => {
  try {
    const formData = new FormData();
    formData.append("image", logoFile);
    formData.append("userId", 1);

    const response = await axios.post(`${API_BASE_URL}/logo/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const getLogos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logo/`, {
      params: {
        userId: 1,
      },
    });
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
        axios.post(`${API_BASE_URL}/upload`, formData, {
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

// ✅ 유저별 이미지 조회
export const fetchUserImages = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      params: { userId }, // 🔁 여기를 쿼리 파라미터 방식으로
    });
    return response.data;
  } catch (error) {
    console.error("회원 이미지 조회 실패:", error);
    return [];
  }
};

// ✅ 새로 추가: 전체 이미지 조회
export const fetchAllImages = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { userId }, // 🔁 userId를 쿼리 파라미터로 전달
    });
    return response.data;
  } catch (error) {
    console.error("전체 이미지 조회 실패:", error);
    return [];
  }
};
