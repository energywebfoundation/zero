import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDto, useUsersControllerMe } from '@energyweb/zero-api-client';

export const useTopBarUserProfileContainerEffects = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useUsersControllerMe();

  const isAuthenticated = localStorage.getItem('token');

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token')
    navigate('/');
  }, []);

  const navigateToProfileHandler = useCallback(() => {

  }, []);
  const navigateToMyAccountHandler = useCallback(() => {
    navigate('/account/dashboard');
  }, []);

  return {
    userProfileData: !!user ? user : ({} as UserDto),
    isAuthenticated,
    isLoading,
    handlers: {
      navigateToMyAccountHandler,
      navigateToProfileHandler,
      logoutHandler,
    },
  };
};
