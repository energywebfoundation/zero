import { Route, Routes } from 'react-router-dom';
import {
  AccountSellerDashboardEmptyPage,
  SellerAddFacilitiesPage,
} from '@energyweb/zero-ui-seller';
import { useAccountSellerDashboardPageEffects } from './account-seller-dashboard-page.effects';
import { CircularProgress } from '@material-ui/core';

export const AccountSellerDashboardPage = () => {
  const {
    navigateToAddFacilitiesPageHandler,
    user,
    isLoading
  } = useAccountSellerDashboardPageEffects();

  if(isLoading) return <CircularProgress />

  return (
      <Routes>
        <Route path={'add-facilities'} element={<SellerAddFacilitiesPage />} />
        <Route
          path={'empty'}
          element={
            <AccountSellerDashboardEmptyPage
              navigateToAddFacilitiesPageHandler={
                navigateToAddFacilitiesPageHandler
              }
              userProfileData={user}
            />
          }
        />
      </Routes>
  );
};

export default AccountSellerDashboardPage;
