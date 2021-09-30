
import { useEffect } from 'react';
import { useAxiosInterceptors, useUsersControllerMe } from '@energyweb/zero-api-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAppEffects = () => {
  useAxiosInterceptors();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  const { isFetched, data: user, error, isLoading } = useUsersControllerMe({
    query: {
      enabled: Boolean(authToken),
    },
  });

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    if (isFetched && user) {
      navigate('/account/dashboard');
      toast(`Welcome back ${user.firstName}!`);
    } else if (error && authToken) {
      localStorage.removeItem('token')
      toast('You were logged out');
      navigate('/auth/sign-in');
    }
  }, [isFetched, user]);

  return { isLoading, isAuthenticated };
};
