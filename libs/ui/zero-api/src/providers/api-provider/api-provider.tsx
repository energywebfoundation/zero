import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAxiosInterceptors } from './axios-interceptors.effects';

/* eslint-disable-next-line */
export interface ApiProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({});

export const ApiProvider = ({ children }: ApiProviderProps) => {
  useAxiosInterceptors();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
