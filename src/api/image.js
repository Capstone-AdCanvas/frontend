import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/image';

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('userId', '3');

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const removeBackground = async (imageId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bg/${imageId}/remove`, {
      userId: 3
    });
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
