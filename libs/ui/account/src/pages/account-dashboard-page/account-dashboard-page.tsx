import styled from '@emotion/styled';
import AccountSellerDashboardPage from '../account-seller-dashboard-page/account-seller-dashboard-page';
import AccountBuyerDashboardPage from '../account-buyer-dashboard-page/account-buyer-dashboard-page';
import { useAccountDasboardPageEffects } from './account-dashboard-page.effects';
import { Box, Typography } from '@material-ui/core';

/* eslint-disable-next-line */
export interface AccountDashboardPageProps {}

const StyledAccountDashboardPage = styled.div`
  padding-top: 88px;
`;

export function AccountDashboardPage(props: AccountDashboardPageProps) {
  const { selectors } = useAccountDasboardPageEffects();
  return (
    <StyledAccountDashboardPage>
      <Typography
        fontSize={'24px'}
        variant={'h6'}
        fontWeight={600}
        textAlign={'center'}
        color={'primary'}
      >
        Welcome to Zero, {selectors.userProfileData?.firstName}
      </Typography>
      <Typography
        mb={'80px'}
        fontWeight={700}
        textAlign={'center'}
        fontSize={'32px'}
        color={'primary'}
        variant={'h5'}
      >
        Here are your{' '}
        <Box
          component={'span'}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          next steps
        </Box>
      </Typography>
      {<AccountSellerDashboardPage />}
      {selectors.isUserBuyer && <AccountBuyerDashboardPage />}
    </StyledAccountDashboardPage>
  );
}

export default AccountDashboardPage;
