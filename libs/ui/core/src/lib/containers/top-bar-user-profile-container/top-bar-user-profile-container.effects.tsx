import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authStateSelectors, authStateActions } from '@energyweb/zero-ui-store';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import { useSnackbar } from 'notistack';

export const useTopBarUserProfileContainerEffects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const logoutHandler = useCallback(() => {
    localforage.removeItem('token').then((value) => {
      dispatch(authStateActions.setIsAuthenticated(false));
      dispatch(authStateActions.setToken(null));
      // enqueueSnackbar('You have been logged out');
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
