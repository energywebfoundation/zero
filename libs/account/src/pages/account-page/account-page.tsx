import { Route, Routes } from 'react-router-dom';
import AccountDashboardPage from '../account-dashboard-page/account-dashboard-page';
import { Helmet } from 'react-helmet-async';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui';
/* eslint-disable-next-line */
export interface AccountPageProps {}

export const AccountPage = (props: AccountPageProps) => {
  return (
    <LayoutWithTopbarContainer bgColor={'#f6f3f9'}>
      <Helmet>
        <title>Account / Dashboard</title>
      </Helmet>
      <Routes>
        <Route path={'dashboard/*'} element={<AccountDashboardPage />} />
      </Routes>
    </LayoutWithTopbarContainer>
  );
};

export default AccountPage;
