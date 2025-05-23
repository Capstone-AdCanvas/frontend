import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/tts';

export const convertToSpeech = async (params) => {
  try {
    const response = await axios.post(API_BASE_URL, params);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      throw error.response.data;
    } else {
      console.error('Network or Unknown Error:', error);
      throw { message: '서버와 연결할 수 없습니다.' };
    }
  }
};

export const previewTTS = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/preview`, params);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      throw error.response.data;
    } else {
      console.error('Network or Unknown Error:', error);
      throw { message: '서버와 연결할 수 없습니다.' };
    }
  }
};
