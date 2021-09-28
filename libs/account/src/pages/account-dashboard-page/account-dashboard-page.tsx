import styled from '@emotion/styled';
import AccountSellerDashboardPage from '../account-seller-dashboard-page/account-seller-dashboard-page';
import AccountBuyerDashboardPage from '../account-buyer-dashboard-page/account-buyer-dashboard-page';
import { useAccountDasboardPageEffects } from './account-dashboard-page.effects';

/* eslint-disable-next-line */
export interface AccountDashboardPageProps {}

const StyledAccountDashboardPage = styled.div`
  padding-top: 88px;
`;

export const AccountDashboardPage = (props: AccountDashboardPageProps) => {
  const { selectors } = useAccountDasboardPageEffects();
  return (
    <StyledAccountDashboardPage>
      {selectors.isUserSeller && <AccountSellerDashboardPage />}
      {selectors.isUserBuyer && <AccountBuyerDashboardPage />}
    </StyledAccountDashboardPage>
  );
};

export default AccountDashboardPage;
