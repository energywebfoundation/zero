import axios, { AxiosRequestConfig } from 'axios';

export const getWithResponseType = <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axios({ ...config, cancelToken: source.token }).then(
    (res) => {
      return res.data;
    }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export default getWithResponseType;
