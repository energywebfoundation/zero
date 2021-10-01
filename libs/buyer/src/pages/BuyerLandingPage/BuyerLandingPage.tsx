import { Box, Paper, Typography } from '@material-ui/core';
import {
  CallToActionButton,
  LayoutWithTopbarContainer,
} from '@energyweb/zero-ui-core';
import { useTranslation } from 'react-i18next';
import { useBuyerLandingPageEffects } from './BuyerLandingPage.effects';

export const BuyerLandingPage = () => {
  const {
    handlers: { navigateToSignupPageHandler },
  } = useBuyerLandingPageEffects();
  const { t } = useTranslation();
  return (
    <LayoutWithTopbarContainer>
      <Box width={'100%'} textAlign={'center'}>
        <Box my={'40px'}>
          <Typography
            color={'secondary'}
            variant={'h3'}
            fontWeight={700}
            fontSize={'40px'}
            lineHeight={'51px'}
            mb={'24px'}
          >
            {t('buyerLandingPage.welcomeToZero')}
          </Typography>
          <Typography
            fontWeight={600}
            variant={'h5'}
            fontSize={'24px'}
            lineHeight={'31px'}
          >
            {t('buyerLandingPage.aGlobalSearchEngineForRenevableEnergy')}
          </Typography>
        </Box>
        <Box>
          <CallToActionButton
            onClick={navigateToSignupPageHandler}
            translateKey={'buyerLandingPage.callToAction'}
          />
        </Box>
        <Box my={'40px'}>
          <Paper>
            Form should be here
          </Paper>
        </Box>
      </Box>
    </LayoutWithTopbarContainer>
  );
};