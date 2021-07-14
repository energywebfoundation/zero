import styled from '@emotion/styled';
import { Grid, Typography } from '@material-ui/core';
import AuthLoginForm from '../../components/auth-login-form/auth-login-form';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Logo } from '@energy-web-zero/zero-ui-assets';
import Box from '@material-ui/system/Box/Box';
import { GenericFormCard } from '@energyweb/zero-ui';
import { useTranslation } from 'react-i18next';
import { useAuthLoginPageEffects } from './auth-login-page.effects';

/* eslint-disable-next-line */
export interface AuthLoginPageProps {}

const StyledAuthLoginPage = styled.div`
  margin-top: 15vh;
`;

export const AuthLoginPage = () => {
  const { t } = useTranslation();
  const { handleFormSubmitFn } = useAuthLoginPageEffects();
  return (
    <StyledAuthLoginPage>
      <Box mb={'40px'} textAlign={'center'}>
        <Logo transform={'scale(1.2)'} />
      </Box>
      <Grid container justifyContent={'center'}>
        <Grid item sm={5}>
          <GenericFormCard>
            <Typography
              variant={'h6'}
              fontWeight={700}
              textAlign={'center'}
              color={'secondary'}
            >
              {t('authLoginPage.headText')}
            </Typography>
            <Typography
              textAlign={'center'}
              color={'primary'}
              variant={'body1'}
              fontWeight={500}
            >
              {t('authLoginPage.subHeadText')}
            </Typography>
            <AuthLoginForm sumbitHandler={handleFormSubmitFn} />
          </GenericFormCard>
        </Grid>
      </Grid>
    </StyledAuthLoginPage>
  );
};

export default AuthLoginPage;
