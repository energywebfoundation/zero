import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import { DashboardPage } from './pages';

export const AccountApp = () => {
  return (
    <LayoutWithTopbarContainer bgColor={'#f6f3f9'}>
      <Helmet>
        <title>Account / Dashboard</title>
      </Helmet>
      <Routes>
        <Route path={'dashboard/*'} element={<DashboardPage />} />
      </Routes>
    </LayoutWithTopbarContainer>
  );
};
