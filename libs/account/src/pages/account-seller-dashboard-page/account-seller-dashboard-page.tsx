import { Route, Routes } from 'react-router-dom';
import {
  AccountSellerDashboardEmptyPage,
  SellerAddFacilitiesPage,
} from '@energyweb/zero-ui-seller';
import { useAccountSellerDashboardPageEffects } from './account-seller-dashboard-page.effects';

export const AccountSellerDashboardPage = () => {
  const {
    selectors,
    handlers: { navigateToAddFacilitiesPageHandler },
  } = useAccountSellerDashboardPageEffects();
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
              userProfileData={selectors.userProfileData}
            />
          }
        />
      </Routes>
  );
};

export default AccountSellerDashboardPage;
