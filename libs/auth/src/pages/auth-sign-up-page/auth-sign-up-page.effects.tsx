import {
  UserDto,
  UserRole,
  useUsersControllerCreate,
} from '@energyweb/zero-ui-client';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import { useCallback } from 'react';
import { AuthSignUpFormFields } from '../../components/auth-sign-up-form/auth-sign-up-form';
import { useNavigate } from 'react-router-dom';
export const useAuthSignUpPageEffects = () => {
  const { mutateAsync } = useUsersControllerCreate();
  const navigate = useNavigate();
  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<AuthSignUpFormFields> =
    useCallback(
      (createUserData) =>
        mutateAsync({
          data: {
            email: createUserData.email,
            lastName: createUserData.lastName,
            firstName: createUserData.firstName,
            password: createUserData.password,
            roles: [createUserData.userRole],
          },
        })
          .then((value) => {
            navigate('/auth/sign-in');
          })
          .catch((reason) => console.log(reason)),
      [mutateAsync]
    );
  return { handleFormSubmitFn };
};
