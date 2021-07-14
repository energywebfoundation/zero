import axios, { AxiosRequestConfig } from 'axios';
import { useEffectOnce } from 'react-use';

export const useAxiosInterceptors = () => {
  useEffectOnce(() => {
    const token = 'abcdef';
    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.baseURL = process.env.NX_BACKEND_URL;
        console.log(config);
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
  });
};
