import { getStorageItem } from '@/utils/storage';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStorageItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    //console.log(error.response.status);
    console.log(originalRequest);
    if (error.response.status === 401) {
      //originalRequest._retry = true;
      try {
        // 원래 요청 재시도
        const refreshResponse = await axios.post(
          `${BACKEND_URL}/auth/reissue`,
          {},
          { withCredentials: true },
        );
        console.log(refreshResponse.data);
        const { accessToken } = refreshResponse.data.result;
        localStorage.setItem('accessToken', accessToken);
        return axiosInstance(originalRequest);
      } catch (retryError) {
        console.error('재요청 실패:', retryError);
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
