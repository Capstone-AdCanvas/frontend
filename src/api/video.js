import axios from 'axios';

// TODO: 실제 서버 주소로 변경 필요
const BASE_URL = 'http://localhost:8080/api/v1/videos';

// 이미지를 URL로 변환하는 함수
export const convertImageToUrl = async (imageFile) => {
  // TODO: 이미지 파일을 서버에 업로드하고 URL을 받아오는 로직 구현
  // 현재는 임시로 base64 URL을 반환
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(imageFile);
  });
};

// 이미지 to 비디오 생성 API
export const createImageToVideo = async (prompt, imageUrl, duration, aspectRatio) => {
  try {
    const response = await axios.post(`${BASE_URL}/images/Kling-pro`, {
      prompt,
      imageUrl,
      duration: parseInt(duration),
      aspect_ratio: aspectRatio
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data || error;
  }
};

// 이미지 to 비디오 상태 조회 API
export const getImageToVideoStatus = async (requestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data || error;
  }
};

// 폴링 함수
export const pollVideoStatus = async (requestId, onComplete, onError) => {
  const pollInterval = 120000; // 2분
  const maxAttempts = 30; // 최대 1시간 (2분 * 30)
  let attempts = 0;

  const poll = async () => {
    try {
      const status = await getImageToVideoStatus(requestId);
      
      if (status.status === 'COMPLETED') {
        onComplete(status);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        onError(new Error('비디오 생성 시간이 초과되었습니다.'));
        return;
      }

      setTimeout(poll, pollInterval);
    } catch (error) {
      console.error('Polling Error:', error);
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
      aspect_ratio: aspectRatio
    };

    console.log('API 요청 데이터:', requestData);

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/texts/Kling-pro`,
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000, // 30초 타임아웃
      validateStatus: function (status) {
        return status >= 200 && status < 300; // 2xx 상태 코드만 성공으로 처리
      }
    });

    console.log('API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      } 
    });
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('AI 서버 접근 권한이 없습니다. 관리자에게 문의해주세요.');
    }
    
    if (error.response?.status === 500) {
      if (error.response?.data?.message === 'AI 서버 내부 오류입니다.') {
        throw new Error('AI 서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      throw new Error('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('비디오 생성 중 오류가 발생했습니다.');
    }
  }
};

// text to video 상태 조회 API
export const getTextToVideoStatus = async (requestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/texts/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('상태 조회 실패:', {
      requestId,
      status: error.response?.status,
      data: error.response?.data
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
        requestIds.map(id => getTextToVideoStatus(id))
      );
      
      console.log('현재 상태:', statuses);
      
      // 모든 상태가 completed인지 확인 (대소문자 구분 없이)
      const allCompleted = statuses.every(status => 
        status.status?.toLowerCase() === 'completed' && status.videoUrl
      );
      
      if (allCompleted) {
        const videoUrls = statuses.map(status => status.videoUrl);
        console.log('모든 비디오 생성 완료:', videoUrls);
        onComplete(statuses); // videoUrls 대신 전체 statuses 객체를 전달
        return;
      }

      // 일부 비디오가 실패했는지 확인
      const hasFailed = statuses.some(status => 
        status.status?.toLowerCase() === 'failed' || 
        status.status?.toLowerCase() === 'error'
      );

      if (hasFailed) {
        onError(new Error('일부 비디오 생성에 실패했습니다.'));
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        onError(new Error('비디오 생성 시간이 초과되었습니다.'));
        return;
      }

      setTimeout(poll, pollInterval);
    } catch (error) {
      console.error('폴링 중 오류 발생:', error);
      // 404 에러가 발생하면 폴링 중단
      if (error.status === 404 || error.httpStatus === 'NOT_FOUND') {
        onError(new Error('요청한 비디오를 찾을 수 없습니다.'));
        return;
      }
      onError(error);
    }
  };

  poll();
};
