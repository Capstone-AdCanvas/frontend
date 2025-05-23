import axios from "axios";

// TODO: 실제 서버 주소로 변경 필요
const BASE_URL = "http://localhost:8080/api/v1/videos";

// 이미지를 URL로 변환하는 함수
export const convertImageToUrl = async (imageFile) => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error("이미지 변환에 실패했습니다."));
      };
      reader.readAsDataURL(imageFile);
    });
  } catch (error) {
    console.error("이미지 변환 중 오류 발생:", error);
    throw new Error("이미지 변환에 실패했습니다.");
  }
};

// 이미지 to 비디오 생성 API
export const createImageToVideo = async (
  prompt,
  imageUrl,
  duration,
  aspectRatio
) => {
  try {
    const response = await axios.post(`${BASE_URL}/images/Kling-pro`, {
      prompt,
      imageUrl,
      duration: parseInt(duration),
      aspect_ratio: aspectRatio,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.response?.status === 422) {
      throw new Error(
        "정책 위반 콘텐츠입니다. 다른 이미지나 프롬프트를 사용해주세요."
      );
    }
    throw error.response?.data || error;
  }
};

// 이미지 to 비디오 상태 조회 API
export const getImageToVideoStatus = async (requestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // 에러 메시지에서 422 관련 내용 확인
    if (
      error.response?.data?.message?.includes("422") ||
      error.response?.data?.message?.includes("정책 위반") ||
      error.message?.includes("422")
    ) {
      throw new Error(
        "정책 위반 콘텐츠입니다. 다른 이미지나 프롬프트를 사용해주세요."
      );
    } else if (error.response?.status === 500) {
      throw new Error(
        "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
    throw error.response?.data || error;
  }
};

// 폴링 함수
export const pollVideoStatus = async (requestId, onComplete, onError) => {
  const pollInterval = 30000; // 30초
  const maxAttempts = 40; // 최대 20분 (30초 * 40)
  let attempts = 0;
  let isPolling = true;

  const poll = async () => {
    if (!isPolling) return;

    try {
      console.log(`폴링 시도 ${attempts + 1}/${maxAttempts}`);
      const status = await getImageToVideoStatus(requestId);
      console.log("현재 상태:", status);

      if (status.status === "COMPLETED") {
        isPolling = false;

        // 비디오 저장
        try {
          const savedVideo = await saveVideo(id, {
            name: `sample${Date.now()}`,
            videoUrl: status.videoUrl,
            aspectRatio: status.aspect_ratio,
            duration: parseInt(status.duration),
            createdAt: status.createdAt,
          });
          console.log("영상이 저장되었습니다:", savedVideo);
        } catch (saveError) {
          console.error("영상 저장 중 오류 발생:", saveError);
        }

        onComplete(status);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        isPolling = false;
        onError(new Error("비디오 생성 시간이 초과되었습니다."));
        return;
      }

      if (isPolling) {
        setTimeout(poll, pollInterval);
      }
    } catch (error) {
      console.error("Polling Error:", error);
      isPolling = false;
      onError(error);
    }
  };

  poll();
};

// text to video 생성 API
export const createTextToVideo = async (prompt, second, aspectRatio) => {
  try {
    // 프롬프트 전처리 (공백만 제거)
    const processedPrompt = prompt.trim();

    const requestData = {
      prompt: processedPrompt,
      second: parseInt(second),
      duration: 5, // 항상 5초로 고정
      aspect_ratio: aspectRatio,
    };

    console.log("API 요청 데이터:", requestData);

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/texts/Kling-pro`,
      data: requestData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000, // 30초 타임아웃
      validateStatus: function (status) {
        return status >= 200 && status < 300; // 2xx 상태 코드만 성공으로 처리
      },
    });

    console.log("API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
    });

    if (error.code === "ECONNABORTED") {
      throw new Error(
        "서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
      );
    }

    if (error.response?.status === 403) {
      throw new Error("AI 서버 접근 권한이 없습니다. 관리자에게 문의해주세요.");
    }

    if (error.response?.status === 500) {
      if (error.response?.data?.message === "AI 서버 내부 오류입니다.") {
        throw new Error(
          "AI 서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
      throw new Error(
        "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("비디오 생성 중 오류가 발생했습니다.");
    }
  }
};

// text to video 상태 조회 API
export const getTextToVideoStatus = async (requestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/texts/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("상태 조회 실패:", {
      requestId,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error.response?.data || error;
  }
};

// text to video 폴링 함수
export const pollTextVideoStatus = async (requestIds, onComplete, onError) => {
  const pollInterval = 30000; // 30초
  const maxAttempts = 40; // 최대 20분 (30초 * 40)
  let attempts = 0;

  const poll = async () => {
    try {
      console.log(`폴링 시도 ${attempts + 1}/${maxAttempts}`);

      const statuses = await Promise.all(
        requestIds.map((id) => getTextToVideoStatus(id))
      );

      console.log("현재 상태:", statuses);

      // 모든 상태가 completed인지 확인 (대소문자 구분 없이)
      const allCompleted = statuses.every(
        (status) =>
          status.status?.toLowerCase() === "completed" && status.videoUrl
      );

      if (allCompleted) {
        const videoUrls = statuses.map((status) => status.videoUrl);
        console.log("모든 비디오 생성 완료:", videoUrls);
        onComplete(statuses); // videoUrls 대신 전체 statuses 객체를 전달
        return;
      }

      // 일부 비디오가 실패했는지 확인
      const hasFailed = statuses.some(
        (status) =>
          status.status?.toLowerCase() === "failed" ||
          status.status?.toLowerCase() === "error"
      );

      if (hasFailed) {
        onError(new Error("일부 비디오 생성에 실패했습니다."));
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        onError(new Error("비디오 생성 시간이 초과되었습니다."));
        return;
      }

      setTimeout(poll, pollInterval);
    } catch (error) {
      console.error("폴링 중 오류 발생:", error);
      // 404 에러가 발생하면 폴링 중단
      if (error.status === 404 || error.httpStatus === "NOT_FOUND") {
        onError(new Error("요청한 비디오를 찾을 수 없습니다."));
        return;
      }
      onError(error);
    }
  };

  poll();
};

// 비디오 저장 API
export const saveVideo = async (userId, videoData) => {
  try {
    const requestData = {
      name: `video-${Date.now()}`, // 임시 이름 생성
      videoUrl: videoData.videoUrl,
      aspectRatio: videoData.aspectRatio,
      duration: videoData.duration,
      createdAt: new Date().toISOString(),
    };

    console.log("저장할 비디오 데이터:", requestData);

    const response = await axios.post(`${BASE_URL}/${userId}`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("저장 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("비디오 저장 실패:", error);
    if (error.response) {
      console.error("서버 응답:", error.response.data);
      if (error.response.status === 404) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
      if (error.response.status === 500) {
        throw new Error("서버 내부 오류가 발생했습니다.");
      }
    }
    throw new Error("비디오 저장 중 오류가 발생했습니다.");
  }
};

export const uploadVideo = async (userId, videoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, videoData);
    return response.data;
  } catch (error) {
    console.error("비디오 업로드 실패:", error);
    throw error.response?.data || { message: "비디오 업로드 중 오류 발생" };
  }
};

// 현재 유저가 생성한 비디오만 조회
export const fetchUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
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
    const response = await axios.get(`${BASE_URL}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("다른 유저 비디오 조회 실패:", error);
    return [];
  }
};
