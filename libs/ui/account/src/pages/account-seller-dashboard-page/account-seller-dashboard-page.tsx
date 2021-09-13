import styled from '@emotion/styled';
import { useAccountSellerDashboardPageEffects } from './account-seller-dashboard-page.effects';
import { Route, Routes } from 'react-router-dom';
import {
  AccountSellerDashboardEmptyPage,
  SellerAddFacilitiesPage,
} from '@energy-web-zero/seller';

/* eslint-disable-next-line */
export interface AccountSellerDashboardPageProps {}

const StyledAccountSellerDashboardPage = styled.div``;

export const AccountSellerDashboardPage = () => {
  const {
    selectors,
    handlers: { navigateToAddFacilitiesPageHandler },
  } = useAccountSellerDashboardPageEffects();
  return (
    <StyledAccountSellerDashboardPage>
      <Routes>
        <Route path={'add-facilities'} element={<SellerAddFacilitiesPage />} />
        <Route
          path={'empty'}
          element={
            <AccountSellerDashboardEmptyPage
              navigateToAddFacilitiesPageHandler={
                navigateToAddFacilitiesPageHandler
              }
              userProfileData={selectors.userProfileData}
            />
          }
        />
      </Routes>
    </StyledAccountSellerDashboardPage>
  );
};

export default AccountSellerDashboardPage;
