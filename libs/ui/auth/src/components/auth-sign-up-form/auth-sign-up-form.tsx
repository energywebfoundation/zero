import styled from '@emotion/styled';
import {
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericFormCancelButton,
  GenericFormSubmitButton,
  TGenericFormSubmitHandlerFn,
  PasswordStrengthInfo,
} from '@energyweb/zero-ui';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { authSignUpFormSchema } from './auth-signup-form.schema';
import { authSignupFormFields } from './auth-signup-form.fields';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserDto, UserRole } from '@energyweb/zero-ui-api';

/* eslint-disable-next-line */
export interface AuthSignupFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<AuthSignUpFormFields>;
}

const StyledAuthSignupForm = styled.div``;

export interface AuthSignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  userRole: UserRole;
}

const initialValues: Omit<CreateUserDto, 'password' | 'roles'> = {
  firstName: '',
  lastName: '',
  email: '',
};

export const AuthSignUpForm: FC<AuthSignupFormProps> = ({ submitHandler }) => {
  const navigate = useNavigate();
  return (
    <StyledAuthSignupForm>
      <GenericFormContainer<AuthSignUpFormFields>
        submitHandler={submitHandler}
        validationSchema={authSignUpFormSchema}
        initialValues={initialValues}
        fields={authSignupFormFields}
      >
        <Grid container spacing={'40px'}>
          <Grid item sm={6}>
            <GenericFormFieldContainer fieldName={'firstName'} />
            <GenericFormFieldContainer fieldName={'email'} />
            <GenericFormFieldContainer fieldName={'password'} />
          </Grid>
          <Grid item sm={6}>
            <GenericFormFieldContainer fieldName={'lastName'} />
            <Box>
              <GenericFormFieldContainer fieldName={'userRole'} />
            </Box>
            <GenericFormFieldContainer fieldName={'passwordConfirm'} />
          </Grid>
        </Grid>
        <Grid item>
          <PasswordStrengthInfo />
        </Grid>
        <Grid item py={'20px'}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <GenericFormCancelButton
              handleCancel={useCallback(() => {
                navigate('/auth/sign-in');
              }, [navigate])}
            />
            <GenericFormSubmitButton />
          </Box>
        </Grid>
      </GenericFormContainer>
    </StyledAuthSignupForm>
  );
};

export default AuthSignUpForm;
