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
import { authLoginFormFields } from './SignInForm.fields';
import { authLoginFormSchema } from './SignInForm.schema';

export interface SignInFormFields {
  email: string;
  password: string;
};

export interface SignInFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SignInFormFields>;
};

export const SignInForm: FC<SignInFormProps> = ({
  submitHandler,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <GenericFormContainer<SignInFormFields>
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
