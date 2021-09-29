import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppControllerLogin } from '@energyweb/zero-api-client';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui-core';
import { authStateActions } from '@energyweb/zero-ui-store';
import { AuthLoginFormFields } from '../../components/auth-login-form/auth-login-form';

export const useAuthLoginPageEffects = () => {
  const { mutateAsync } = useAppControllerLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<AuthLoginFormFields> =
    useCallback(
      (loginData: AuthLoginFormFields) => {
        return (
          mutateAsync({
            data: { username: loginData.email, password: loginData.password },
          })
            .then(({ accessToken }) => {
              dispatch(authStateActions.setToken(accessToken));
              navigate('/account/dashboard/empty');
            })
            .catch((reason) => {
              alert(reason);
              console.log(reason);
            })
        );
      },
      [mutateAsync]
    );
  return {
    handleFormSubmitFn,
  };
};
