import styled from '@emotion/styled';
import {
  CallToActionButton,
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericFormSubmitButton,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import { authLoginFormSchema } from './auth-login-form.schema';
import { Box, Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { authLoginFormFields } from './auth-login-form-fields';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

export interface AuthLoginFormProps {
  sumbitHandler: TGenericFormSubmitHandlerFn<AuthLoginFormFields>;
}

const StyledAuthLoginForm = styled.div``;

export interface AuthLoginFormFields {
  email: string;
  password: string;
}

export const AuthLoginForm: FC<AuthLoginFormProps> = ({
  sumbitHandler,
}: AuthLoginFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <StyledAuthLoginForm>
      <GenericFormContainer<AuthLoginFormFields>
        inputsVariant={'filled'}
        submitHandler={sumbitHandler}
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
            <GenericFormSubmitButton />
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
    </StyledAuthLoginForm>
  );
};

export default AuthLoginForm;
