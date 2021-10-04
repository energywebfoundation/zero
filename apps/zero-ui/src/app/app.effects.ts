
import { useAxiosInterceptors, useUsersControllerMe } from '@energyweb/zero-api-client';

export const useAppEffects = () => {
  useAxiosInterceptors();
  const authToken = localStorage.getItem('token');
  const isAuthenticated = Boolean(authToken);

  const { isLoading } = useUsersControllerMe({
    query: {
      enabled: isAuthenticated,
    },
  });

  return { isLoading, isAuthenticated };
};
