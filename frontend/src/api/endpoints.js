import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const endpoints = {
  checkHealth: async () => {
    const response = await api.get('/');
    return response.data;
  },

  computeMetrics: async (rawFile, referenceFile) => {
    const formData = new FormData();
    formData.append('raw', rawFile);
    if (referenceFile) {
      formData.append('referance', referenceFile);
    }

    const response = await api.post('/matrices', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  classifyWater: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/classify-water', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  cleanImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/clean-img', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
