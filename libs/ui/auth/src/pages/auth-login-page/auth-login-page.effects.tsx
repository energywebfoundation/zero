import { LoginDataDTO, useAppControllerLogin } from '@energyweb/zero-ui-api';
import { useCallback } from 'react';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import { AuthLoginFormFields } from '../../components/auth-login-form/auth-login-form';
import { useDispatch } from 'react-redux';

export const useAuthLoginPageEffects = () => {
  const { mutateAsync } = useAppControllerLogin();
  const dispatch = useDispatch();

  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<AuthLoginFormFields> = useCallback(
    (loginData: AuthLoginFormFields) => {
      return mutateAsync({
        data: { username: loginData.email, password: loginData.password },
      })
        .then((value) => {})
        .catch((reason) => {
          console.log(reason);
        });
    },
    [mutateAsync]
  );
  return {
    handleFormSubmitFn,
  };
};
