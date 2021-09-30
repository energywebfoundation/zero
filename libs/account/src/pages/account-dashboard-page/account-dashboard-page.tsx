import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import AccountSellerDashboardPage from '../account-seller-dashboard-page/account-seller-dashboard-page';
import { useAccountDasboardPageEffects } from './account-dashboard-page.effects';

const StyledAccountDashboardPage = styled.div`
  padding-top: 88px;
`;

export const AccountDashboardPage = () => {
  const { isUserSeller, isLoading } = useAccountDasboardPageEffects();

  if(isLoading) return <CircularProgress />

  return (
    <StyledAccountDashboardPage>
      {isUserSeller && <AccountSellerDashboardPage />}
    </StyledAccountDashboardPage>
  );
};

export default AccountDashboardPage;
