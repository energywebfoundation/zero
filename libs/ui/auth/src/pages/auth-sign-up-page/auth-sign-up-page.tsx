import styled from '@emotion/styled';
import { GenericFormCard } from '@energyweb/zero-ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Logo } from '@energy-web-zero/zero-ui-assets';
import Box from '@material-ui/system/Box/Box';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuthSignUpPageEffects } from './auth-sign-up-page.effects';
import AuthSignUpForm from '../../components/auth-sign-up-form/auth-sign-up-form';

/* eslint-disable-next-line */
export interface AuthSIgnUpPageProps {}

const StyledAuthSIgnUpPage = styled.div``;

export const AuthSignUpPage = () => {
  const { t } = useTranslation();
  const { handleFormSubmitFn } = useAuthSignUpPageEffects();
  return (
    <StyledAuthSIgnUpPage>
      <Grid container justifyContent={'center'}>
        <Grid item sm={8}>
          <Box my={'40px'} textAlign={'center'}>
            <Logo transform={'scale(1.2)'} />
          </Box>
          <GenericFormCard>
            <Typography
              variant={'h6'}
              fontWeight={700}
              textAlign={'center'}
              color={'secondary'}
            >
              {t('authSignUpPage.headText')}
            </Typography>
            <Typography
              color={'primary'}
              textAlign={'center'}
              variant={'body1'}
              fontWeight={500}
            >
              {t('authSignUpPage.subHeadText')}
            </Typography>
            <AuthSignUpForm submitHandler={handleFormSubmitFn} />
          </GenericFormCard>
        </Grid>
      </Grid>
    </StyledAuthSIgnUpPage>
  );
};

export default AuthSignUpPage;
