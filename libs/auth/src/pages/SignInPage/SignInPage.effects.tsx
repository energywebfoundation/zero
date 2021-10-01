import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppControllerLogin } from '@energyweb/zero-api-client';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui-core';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { SignInFormFields } from '../../components';

export const useSignInPageEffects = () => {
  const { mutate } = useAppControllerLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<SignInFormFields> =
    useCallback(
      (loginData: SignInFormFields) => {
        return (
          mutate({
            data: { username: loginData.email, password: loginData.password },
          }, {
            onSuccess: async ({ accessToken }) => {
              localStorage.setItem('token', accessToken);

              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${accessToken}`;

              queryClient.resetQueries();

              navigate('/account/dashboard');
           },
           onError: (error) => {
             toast('Error while signing in' + error)
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
