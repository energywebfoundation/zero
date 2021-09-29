import {
  CallToActionButton,
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericFormSubmitButton,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Box, Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { authLoginFormFields } from './auth-login-form-fields';
import { authLoginFormSchema } from './auth-login-form.schema';

export interface AuthLoginFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<AuthLoginFormFields>;
}

export interface AuthLoginFormFields {
  email: string;
  password: string;
}

export const AuthLoginForm: FC<AuthLoginFormProps> = ({
  submitHandler,
}: AuthLoginFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <GenericFormContainer<AuthLoginFormFields>
        inputsVariant={'filled'}
        submitHandler={submitHandler}
        validationSchema={authLoginFormSchema}
        initialValues={{ email: '', password: '' }}
        fields={authLoginFormFields}
      >
        <Grid container>
          <Grid item xs={12}>
            <GenericFormFieldContainer fieldName={'email'} />
            <GenericFormFieldContainer fieldName={'password'} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box justifyContent={'space-between'} display={'flex'} my={'20px'}>
            <Button sx={{ fontSize: '14px', fontWeight: 600 }}>
              {t('forms.AuthLoginForm.resetPasswordBtnText')}
            </Button>
            <GenericFormSubmitButton name={'sign-in'} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CallToActionButton
            onClick={() => {
              navigate('/auth/sign-up');
            }}
            color={'secondary'}
            fullWidth
            translateKey={'forms.AuthLoginForm.createAccountBtnText'}
          />
        </Grid>
      </GenericFormContainer>
    </div>
  );
};

export default AuthLoginForm;
