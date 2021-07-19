import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import {
  authStateActions,
  authStateSelectors,
} from '@energy-web-zero/store-configure';
import { useEffect } from 'react';
import { UserEntity, useUsersControllerMe } from '@energyweb/zero-ui-api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const useAppEffects = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authToken = useSelector(authStateSelectors.token);
  const { isFetched, data } = useUsersControllerMe({
    query: { enabled: Boolean(authToken) },
  });
  useEffect(() => {
    if (isFetched && data) {
      dispatch(authStateActions.setUserProfileData(data as UserEntity));
      dispatch(authStateActions.setIsAuthenticated(true));
      // enqueueSnackbar(`Welcome back ${data.firstName}!`);
      if (data.roles.includes('seller')) {
        navigate('/sellers');
      } else if (data.roles.includes('buyer')) {
        navigate('/buyers');
      }
    }
  }, [isFetched]);

  return bindActionCreators({}, dispatch);
};
