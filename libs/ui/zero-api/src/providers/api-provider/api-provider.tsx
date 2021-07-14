import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAxiosInterceptors } from './axios-interceptors.effects';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  authStateActions,
  authStateSelectors,
} from '@energy-web-zero/store-configure';
import localforage from 'localforage';

/* eslint-disable-next-line */
export interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const distpatch = useDispatch();
  localforage
    .getItem('token')
    .then((value: any) => distpatch(authStateActions.setToken(value)));
  const token = useSelector(authStateSelectors.token);
  const isTokenHeaderSetSet = useAxiosInterceptors(token);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: isTokenHeaderSetSet } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
