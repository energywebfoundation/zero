import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppControllerLogin } from '@energyweb/zero-api-client';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui-core';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { AuthLoginFormFields } from '../../components/auth-login-form/auth-login-form';
import localforage from 'localforage';

export const useAuthLoginPageEffects = () => {
  const { mutate } = useAppControllerLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<AuthLoginFormFields> =
    useCallback(
      (loginData: AuthLoginFormFields) => {
        return (
          mutate({
            data: { username: loginData.email, password: loginData.password },
          }, {
            onSuccess: async ({ accessToken }) => {
              localforage.setItem('token', accessToken);
              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${accessToken}`;
              queryClient.resetQueries();
              navigate('/account/dashboard/empty');
           },
           onError: (error) => {
             alert(error);
             console.log(error);
           }
          })
        );
      },
      [mutate]
    );
  return {
    handleFormSubmitFn,
  };
};
