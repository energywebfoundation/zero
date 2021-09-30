import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SellerLandingPage } from '@energyweb/zero-ui-seller';
import { BuyerLandingPage } from '@energyweb/zero-ui-buyer';
import { AuthPage } from '@energyweb/zero-ui-auth';
import { AccountApp } from '@energyweb/zero-ui-account';
import { LoadingPage, NotFoundPage } from '@energyweb/zero-ui-core';
import { useAppEffects } from './app.effects';

export const App: FC = () => {
  const { isLoading, isAuthenticated } = useAppEffects();

  return (
    <LoadingPage isLoading={isLoading}>
      <Routes>
        <Route path={'auth/*'} element={<AuthPage />} />
        <Route path={'sellers'} element={<SellerLandingPage />} />
        <Route path={'buyers'} element={<BuyerLandingPage />} />
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
