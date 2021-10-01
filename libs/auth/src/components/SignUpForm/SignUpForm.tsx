import {
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericFormCancelButton,
  GenericFormSubmitButton,
  TGenericFormSubmitHandlerFn,
  PasswordStrengthInfo,
} from '@energyweb/zero-ui-core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserDto, UserRole } from '@energyweb/zero-api-client';
import { authSignUpFormSchema } from './SignUpForm.schema';
import { authSignupFormFields } from './SignUpForm.fields';

export interface SignUpFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SignUpFormFields>;
}

export interface SignUpFormFields {
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

export const SignUpForm: FC<SignUpFormProps> = ({ submitHandler }) => {
  const navigate = useNavigate();
  return (
    <div>
      <GenericFormContainer<SignUpFormFields>
        submitHandler={submitHandler}
        validationSchema={authSignUpFormSchema}
        initialValues={initialValues}
        fields={authSignupFormFields}
      >
        <Grid container spacing={'32px'}>
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
            <GenericFormSubmitButton name={'sign-up'} />
          </Box>
        </Grid>
      </GenericFormContainer>
    </div>
  );
};