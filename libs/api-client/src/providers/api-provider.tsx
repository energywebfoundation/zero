import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAxiosInterceptors } from '../hooks/axios-interceptors';

export interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const token = '';
  const isTokenHeaderSetSet = useAxiosInterceptors(token);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: isTokenHeaderSetSet } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
