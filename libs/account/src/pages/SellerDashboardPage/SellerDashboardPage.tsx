import { Route, Routes } from 'react-router-dom';
import { AddFacilitiesPage, AccountSellerDashboardEmptyPage } from '@energyweb/zero-ui-seller';
import { CircularProgress } from '@material-ui/core';
import { useSellerDashboardPageEffects } from './SellerDashboardPage.effects';

export const SellerDashboardPage = () => {
  console.log('showing seller dashboard');
  const {
    navigateToAddFacilitiesPageHandler,
    user,
    isLoading
  } = useSellerDashboardPageEffects();

  if (isLoading) return <CircularProgress />

  return (
      <Routes>
        <Route path={'add-facilities'} element={<AddFacilitiesPage />} />
        <Route
          path={'/'}
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
