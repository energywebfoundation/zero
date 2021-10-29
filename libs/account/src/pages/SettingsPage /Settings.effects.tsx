import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersControllerCreate } from '@energyweb/zero-api-client';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui-core';
import { SignUpFormFields } from '../../../../auth/src/components/SignUpForm/SignUpForm';

export const useSignUpPageEffects = () => {
  const { mutateAsync } = useUsersControllerCreate();
  const navigate = useNavigate();
  const handleFormSubmitFn: TGenericFormSubmitHandlerFn<SignUpFormFields> =
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
          .then(() => {
            navigate('/auth/sign-in');
          })
          .catch((reason) => console.log(reason)),
      [mutateAsync]
    );
  return { handleFormSubmitFn };
};
