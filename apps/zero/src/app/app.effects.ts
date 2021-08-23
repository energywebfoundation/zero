import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import {
  authStateActions,
  authStateSelectors,
} from '@energy-web-zero/store-configure';
import { useEffect } from 'react';
import { UserDto, useUsersControllerMe } from '@energyweb/zero-ui-api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import localforage from 'localforage';

export const useAppEffects = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authToken = useSelector(authStateSelectors.token);
  const { isFetched, data, error } = useUsersControllerMe({
    query: {
      retry: 1,
      enabled: Boolean(authToken),
    },
  });
  useEffect(() => {
    if (isFetched && data) {
      dispatch(authStateActions.setUserProfileData(data as UserDto));
      dispatch(authStateActions.setIsAuthenticated(true));
      navigate('/account/dashboard/empty');
      // enqueueSnackbar(`Welcome back ${data.firstName}!`);
    } else if (error && authToken) {
      localforage.removeItem('token').then((value) => {
        dispatch(authStateActions.setToken(null));
        dispatch(authStateActions.setIsAuthenticated(false));
        console.log(authToken, 'You are logged out');
        navigate('/auth/sign-out');
      });
    }
  }, [isFetched, data]);

  return bindActionCreators({}, dispatch);
};
