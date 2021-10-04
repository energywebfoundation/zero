import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SellerApp } from '@energyweb/zero-ui-seller';
import { BuyerApp } from '@energyweb/zero-ui-buyer';
import { AuthPage } from '@energyweb/zero-ui-auth';
import { AccountApp } from '@energyweb/zero-ui-account';
import { LoadingPage, NotFoundPage } from '@energyweb/zero-ui-core';
import { MainLandingPage } from '../pages';
import { useAppEffects } from './app.effects';

export const App: FC = () => {
  const { isLoading, isAuthenticated } = useAppEffects();

  return (
    <LoadingPage isLoading={isLoading}>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />

        <Route path={'seller/*'} element={<SellerApp isAuthenticated={isAuthenticated} />} />

        <Route path={'buyer/*'} element={<BuyerApp />} />

        <Route path={'auth/*'} element={<AuthPage />} />

        <Route path={'account/*'} element={<AccountApp />} />

        <Route
          path={'*'}
          element={
            <NotFoundPage
              isAuthenticated={isAuthenticated}
              nonAuthenticatedHomeRoute={'/auth/sign-in'}
              authenticatedHomeRoute={'/account/dashboard'}
            />
          }
        />

      </Routes>
    </LoadingPage>
  );
};
