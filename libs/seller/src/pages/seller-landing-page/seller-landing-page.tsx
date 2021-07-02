import { CallToActionButton } from '@energyweb/zero-ui';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSellerLandingPageEffects } from './seller-landing-page.effects';
/* eslint-disable-next-line */
export interface SellerLandingPageProps {}

export const SellerLandingPage = (props: SellerLandingPageProps) => {
  useSellerLandingPageEffects();
  const { t } = useTranslation();
  return (
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
        <CallToActionButton translateKey={'sellerLandingPage.callToAction'} />
      </Box>
    </Box>
  );
};

export default SellerLandingPage;
