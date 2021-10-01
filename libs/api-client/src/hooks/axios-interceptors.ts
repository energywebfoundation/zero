import axios from 'axios';

declare global {
  interface Window {
    config: {
      BACKEND_URL: string;
    };
  }
}

export const useAxiosInterceptors = () => {
  const token = localStorage.getItem('token');

  axios.defaults.baseURL = window.config.BACKEND_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );
};
