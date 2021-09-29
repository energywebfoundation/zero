import { useDispatch, useSelector } from 'react-redux';
import { authStateSelectors, authStateActions } from '@energyweb/zero-ui-store';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';

export const useTopBarUserProfileContainerEffects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    localforage.removeItem('token').then((value) => {
      dispatch(authStateActions.setIsAuthenticated(false));
      dispatch(authStateActions.setToken(null));
      navigate('/auth/sign-out');
    });
  }, [dispatch]);
  const navigateToProfileHandler = useCallback(() => {
    console.log('navigateToProfileHandler');
  }, []);
  const navigateToMyAccountHandler = useCallback(() => {
    console.log('navigateToMyAccountHandler');
    navigate('/account/dashboard/empty');
  }, []);

  return {
    selectors: {
      userProfileData: useSelector(authStateSelectors.userProfileData),
      isAuthenticated: useSelector(authStateSelectors.isAuthenticated),
    },

    handlers: {
      navigateToMyAccountHandler,
      navigateToProfileHandler,
      logoutHandler,
    },
  };
};
