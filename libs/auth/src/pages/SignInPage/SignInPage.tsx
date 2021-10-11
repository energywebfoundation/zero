import styled from '@emotion/styled';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/system/Box/Box';
import { Logo } from '@energyweb/zero-ui-assets';
import { DevicesBackground, GenericFormCard } from '@energyweb/zero-ui-core';
import { SignInForm } from '../../components';
import { useSignInPageEffects } from './SignInPage.effects';
import { useStyles } from './SignInPage.styles';

const StyledDiv = styled.div`
  margin-top: 15vh;
`;

export const SignInPage = () => {
  const { t } = useTranslation();
  const { handleFormSubmitFn } = useSignInPageEffects();
  const classes = useStyles();

  return (
    <DevicesBackground>
      <StyledDiv>
        <Box mb={'40px'} textAlign={'center'}>
          <Logo transform={'scale(1.2)'} />
        </Box>
        <Grid container justifyContent={'center'}>
          <Grid item sm={5} className={classes.container}>
            <GenericFormCard>
              <Typography
                variant={'h6'}
                fontWeight={700}
                textAlign={'center'}
                color={'secondary'}
                fontSize={'24px'}
                mb={'9px'}
              >
                {t('authLoginPage.headText')}
              </Typography>
              <Typography
                textAlign={'center'}
                color={'primary'}
                variant={'body1'}
                fontWeight={500}
                fontSize={'20px'}
              >
                {t('authLoginPage.subHeadText')}
              </Typography>
              <SignInForm submitHandler={handleFormSubmitFn} />
            </GenericFormCard>
          </Grid>
        </Grid>
      </StyledDiv>
    </DevicesBackground>
  );
};
