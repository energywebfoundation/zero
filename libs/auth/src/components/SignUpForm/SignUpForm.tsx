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
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserDto, UserRole } from '@energyweb/zero-api-client';
import { authSignUpFormSchema } from './SignUpForm.schema';
import { authSignupFormFields } from './SignUpForm.fields';
import { useTranslation } from 'react-i18next';
import { useStyles } from './SignUpForm.styles';

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
  const { t } = useTranslation();
  const classes = useStyles();

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
          {/* Missing block with exact reasons */}
        </Grid>
        <Grid item py={'20px'}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <GenericFormCancelButton
              label={t('forms.cancelBtnText')}
              handleCancel={() => { navigate('/auth/sign-in') }}
              className={classes.button}
            />
            <GenericFormSubmitButton
              className={classes.button}
              name={'sign-up'}
            />
          </Box>
        </Grid>
      </GenericFormContainer>
    </div>
  );
};
