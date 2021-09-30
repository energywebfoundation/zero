import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

export const useAxiosInterceptors = () => {
  axios.defaults.baseURL = process.env.NX_BACKEND_URL;

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (Boolean(token)) {
      axios.interceptors.request.use(
        (config: AxiosRequestConfig): AxiosRequestConfig => {
          config.baseURL = process.env.NX_BACKEND_URL;
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      );

      axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          return Promise.reject(error);
        }
      );
    }
  }, [token]);
};
