import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const mergeVideos = async (videoUrls, tema = 'forest') => {
  try {
    if (!videoUrls || videoUrls.length === 0) {
      throw new Error('영상 URL이 없습니다.');
    }

    const params = new URLSearchParams();
    videoUrls.forEach(url => params.append('videoUrls', url));
    params.append('tema', tema);

    const response = await axios.get(`${API_BASE_URL}/audios/merge`, {
      params,
      responseType: 'blob',
      timeout: 300000 // 5분 타임아웃
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'video/mp4' });
      return URL.createObjectURL(blob);
    } else {
      throw new Error('영상 합성에 실패했습니다.');
    }
  } catch (error) {
    console.error('영상 합성 중 오류:', error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error('잘못된 요청입니다. 영상 URL을 확인해주세요.');
        case 404:
          throw new Error('요청한 영상을 찾을 수 없습니다.');
        case 500:
          throw new Error('서버 내부 오류가 발생했습니다.');
        default:
          throw new Error('영상 합성 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};    