import {
  CallToActionButton,
} from '@energyweb/zero-ui-core';
import { Box, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSellerLandingPageEffects } from './SellerLandingPage.effects';

export const SellerLandingPage = () => {
  const {
    handlers: { navigateToSignupPageHandler },
  } = useSellerLandingPageEffects();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Seller</title>
      </Helmet>
      <Box width={'100%'} textAlign={'center'}>
        <Box my={'40px'}>
          <Typography
            mb={'24px'}
            fontSize={'24px'}
            variant={'h5'}
            lineHeight={'31px'}
            fontWeight={600}
          >
            {t('sellerLandingPage.whatIsZero')}
          </Typography>
          <Typography
            lineHeight={'51px'}
            variant={'h3'}
            fontSize={'40px'}
            fontWeight={'700'}
            color={'secondary'}
          >
            {t('sellerLandingPage.zeroIsGlobalSearchEngineForRenewableEnergy')}
          </Typography>
        </Box>
        <Box my={'40px'}>
          <CallToActionButton
            onClick={navigateToSignupPageHandler}
            translateKey={'sellerLandingPage.callToAction'}
          />
        </Box>
      </Box>
    </>
  );
};
