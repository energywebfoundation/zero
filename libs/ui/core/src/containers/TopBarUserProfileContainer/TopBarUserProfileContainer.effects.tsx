import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import { UserDto, useUsersControllerMe } from '@energyweb/zero-api-client';

export const useTopBarUserProfileContainerEffects = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useUsersControllerMe();

  const isAuthenticated = localStorage.getItem('token');

  const logoutHandler = useCallback(() => {
    localforage.removeItem('token').then((value) => {
      navigate('/auth/sign-out');
    });
  }, []);
  const navigateToProfileHandler = useCallback(() => {
    console.log('navigateToProfileHandler');
  }, []);
  const navigateToMyAccountHandler = useCallback(() => {
    console.log('navigateToMyAccountHandler');
    navigate('/account/dashboard/empty');
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
