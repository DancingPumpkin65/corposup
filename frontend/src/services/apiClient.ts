import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not in login/register pages to prevent refresh loop
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/signin') && !currentPath.includes('/signup')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
