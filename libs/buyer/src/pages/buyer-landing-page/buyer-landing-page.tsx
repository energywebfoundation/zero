import { Box, Paper, Typography } from '@material-ui/core';
import { CallToActionButton } from '@energyweb/zero-ui';
import { useBuyerLandingPageEffects } from './buyer-landing-page.effects';
import SimpleSearchForm from '../../components/simple-search-form/simple-search-form';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface BuyerLandingPageProps {}

export const BuyerLandingPage = (props: BuyerLandingPageProps) => {
  useBuyerLandingPageEffects();
  const { t } = useTranslation();
  return (
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
        <CallToActionButton translateKey={'buyerLandingPage.callToAction'} />
      </Box>
      <Box my={'40px'}>
        <Paper>
          <SimpleSearchForm />
        </Paper>
      </Box>
    </Box>
  );
};

export default BuyerLandingPage;
