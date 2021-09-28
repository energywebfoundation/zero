import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import {
  appStateActions,
  appStateSelectors,
  authStateActions,
  authStateSelectors,
  notificationStateActions,
} from '@energy-web-zero/store';
import { useEffect } from 'react';
import { UserDto, useUsersControllerMe } from '@energy-web-zero/api-client';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import localforage from 'localforage';

export const useAppEffects = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authToken = useSelector(authStateSelectors.token);

  const { isFetched, isFetching, data, error } = useUsersControllerMe({
    query: {
      retry: 1,
      enabled: Boolean(authToken),
    },
  });

  useEffect(() => {
    if (authToken) {
      dispatch(appStateActions.setLoading(isFetching));
    }
  }, [isFetching, authToken]);

  useEffect(() => {
    if (isFetched && data) {
      dispatch(authStateActions.setUserProfileData(data as UserDto));
      dispatch(authStateActions.setIsAuthenticated(true));
      navigate('/account/dashboard/empty');
      enqueueSnackbar(`Welcome back ${data.firstName}!`);
    } else if (error && authToken) {
      localforage.removeItem('token').then((value) => {
        dispatch(authStateActions.setToken(null));
        dispatch(authStateActions.setIsAuthenticated(false));
        enqueueSnackbar('You were logged out');
        navigate('/auth/sign-in');
      });
    }
  }, [isFetched, data]);

  return {
    actions: bindActionCreators(
      {
        addNotification: notificationStateActions.addNotification,
      },
      dispatch
    ),
    selectors: {
      isAuthenticated: useSelector(authStateSelectors.isAuthenticated),
      authenticatedHomeRoute: '/account/dashboard',
      isLoading: useSelector(appStateSelectors.isLoading),
    },
  };
};
