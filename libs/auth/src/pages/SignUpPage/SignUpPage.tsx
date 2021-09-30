import styled from '@emotion/styled';
import { GenericFormCard } from '@energyweb/zero-ui-core';
import { Logo } from '@energyweb/zero-ui-assets';
import Box from '@material-ui/system/Box/Box';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SignUpForm } from '../../components';
import { useSignUpPageEffects } from './SignUpPage.effects';

const StyledAuthSIgnUpPage = styled.div`
  margin-top: 15vh;
`;

export const SignUpPage = () => {
  const { t } = useTranslation();
  const { handleFormSubmitFn } = useSignUpPageEffects();
  return (
    <StyledAuthSIgnUpPage>
      <Grid container justifyContent={'center'}>
        <Grid item sm={8}>
          <Box mb={'32px'} textAlign={'center'}>
            <Logo transform={'scale(1.2)'} />
          </Box>
          <GenericFormCard>
            <Typography
              variant={'h6'}
              fontSize={'24px'}
              fontWeight={700}
              textAlign={'center'}
              color={'secondary'}
              mb={'9px'}
            >
              {t('authSignUpPage.headText')}
            </Typography>
            <Typography
              color={'primary'}
              textAlign={'center'}
              variant={'body1'}
              fontWeight={500}
              fontSize={'20px'}
            >
              {t('authSignUpPage.subHeadText')}
            </Typography>
            <SignUpForm submitHandler={handleFormSubmitFn} />
          </GenericFormCard>
        </Grid>
      </Grid>
    </StyledAuthSIgnUpPage>
  );
};
