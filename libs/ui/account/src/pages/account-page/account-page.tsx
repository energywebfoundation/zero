import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import AccountDashboardPage from '../account-dashboard-page/account-dashboard-page';
import { Helmet } from 'react-helmet';
import { css, Global } from '@emotion/react';
/* eslint-disable-next-line */
export interface AccountPageProps {}

const StyledAccountPage = styled.div``;

export const AccountPage = (props: AccountPageProps) => {
  return (
    <StyledAccountPage>
      <Global
        styles={css`
          body {
            background-color: #e5e5e5;
          }
        `}
      />
      <Helmet>
        <title>Account / Dashboard</title>
      </Helmet>
      <Routes>
        <Route path={'dashboard'} element={<AccountDashboardPage />} />
      </Routes>
    </StyledAccountPage>
  );
};

export default AccountPage;
