import axios from 'axios';
import { getToken } from '../auth/auth';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json'; // Agrega esta línea

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;