
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { UserDto, useUsersControllerMe } from '@energyweb/zero-api-client';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import localforage from 'localforage';

export const useAppEffects = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  const { isFetched, data, error } = useUsersControllerMe({
    query: {
      enabled: Boolean(authToken),
    },
  });

  useEffect(() => {
    if (isFetched && data) {
      navigate('/account/dashboard/empty');
      enqueueSnackbar(`Welcome back ${data.firstName}!`);
    } else if (error && authToken) {
      localforage.removeItem('token').then((value) => {
        enqueueSnackbar('You were logged out');
        navigate('/auth/sign-in');
      });
    }
  }, [isFetched, data]);

  return { isFetched };
};
