import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';
// import { authStateActions, authStateSelectors } from '@energyweb/zero-ui-store';
import { useAxiosInterceptors } from '../hooks/axios-interceptors';

export interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const distpatch = useDispatch();
  // localforage
  //   .getItem('token')
  //   .then((value: any) => distpatch(authStateActions.setToken(value)));
  const token = ''; //useSelector(authStateSelectors.token);
  const isTokenHeaderSetSet = useAxiosInterceptors(token);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: isTokenHeaderSetSet } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
