import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import AccountDashboardPage from '../account-dashboard-page/account-dashboard-page';

export const AccountPage = () => {
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
