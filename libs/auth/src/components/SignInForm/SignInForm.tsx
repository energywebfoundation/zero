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
import { variables } from '@energyweb/zero-ui-theme';
import { FC } from 'react';
import { authLoginFormFields } from './SignInForm.fields';
import { authLoginFormSchema } from './SignInForm.schema';
import { useStyles } from './SignInForm.styles';

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
  const classes = useStyles();

  return (
    <div>
      <GenericFormContainer<SignInFormFields>
        inputsVariant={'filled'}
        submitHandler={submitHandler}
        validationSchema={authLoginFormSchema}
        initialValues={{ email: '', password: '' }}
        fields={authLoginFormFields}
        validationMode='onSubmit'
      >
        <Grid container>
          <Grid item xs={12}>
            <GenericFormFieldContainer fieldName={'email'} />
            <GenericFormFieldContainer fieldName={'password'} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box justifyContent={'space-between'} display={'flex'} my={'20px'}>
            <Button sx={{ fontSize: '14px', fontWeight: 600, color: variables.primaryColor }}>
              {t('forms.AuthLoginForm.resetPasswordBtnText')}
            </Button>
            <GenericFormSubmitButton
              className={classes.submitBtn}
              name={'sign-in'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: '40px' }}>
          <CallToActionButton
            fullWidth
            color='secondary'
            onClick={() => {
              navigate('/auth/sign-up');
            }}
            translateKey={'forms.AuthLoginForm.createAccountBtnText'}
          />
        </Grid>
      </GenericFormContainer>
    </div>
  );
};
