import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';

export const useAxiosInterceptors = (token: string | null) => {
  axios.defaults.baseURL = process.env.NX_BACKEND_URL;
  const isTokenHeaderSet = useRef(false);

  useEffect(() => {
    if (token) {
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
      isTokenHeaderSet.current = true;
    }
  }, [token]);

  return isTokenHeaderSet.current;
};
