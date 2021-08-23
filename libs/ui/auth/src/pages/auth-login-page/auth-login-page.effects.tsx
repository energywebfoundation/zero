import { useAppControllerLogin } from '@energyweb/zero-ui-api';
import { useCallback } from 'react';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import { AuthLoginFormFields } from '../../components/auth-login-form/auth-login-form';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authStateActions } from '@energy-web-zero/store-configure';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const useAuthLoginPageEffects = () => {
  const { mutateAsync } = useAppControllerLogin();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<AuthLoginFormFields> =
    useCallback(
      (loginData: AuthLoginFormFields) => {
        return (
          mutateAsync({
            data: { username: loginData.email, password: loginData.password },
          })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .then(({ accessToken }) => {
              console.log('xxxx', accessToken);
              dispatch(authStateActions.setToken(accessToken));
              navigate('/account/dashboard/empty');
            })
            .catch((reason) => {
              alert('Wrong email or password');
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
