import styled from '@emotion/styled';
import AccountSellerDashboardPage from '../account-seller-dashboard-page/account-seller-dashboard-page';
import { useAccountDasboardPageEffects } from './account-dashboard-page.effects';

const StyledAccountDashboardPage = styled.div`
  padding-top: 88px;
`;

export const AccountDashboardPage = () => {
  const { selectors } = useAccountDasboardPageEffects();
  return (
    <StyledAccountDashboardPage>
      {selectors.isUserSeller && <AccountSellerDashboardPage />}
    </StyledAccountDashboardPage>
  );
};

export default AccountDashboardPage;
