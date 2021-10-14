import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SellerApp } from '@energyweb/zero-ui-seller';
import { BuyerApp } from '@energyweb/zero-ui-buyer';
import { AuthApp } from '@energyweb/zero-ui-auth';
import { AccountApp } from '@energyweb/zero-ui-account';
import { LayoutWithTopbar, LoadingPage, NotFoundPage } from '@energyweb/zero-ui-core';
import { MainLandingPage } from '../pages';
import { useAppEffects } from './app.effects';
import { css, Global } from '@emotion/react';
import { variables } from '@energyweb/zero-ui-theme';

export const App: FC = () => {
  const {
    isLoading,
    isAuthenticated,
    user,
    primaryNavigation,
    logoutHandler,
    navigateToMyAccountHandler,
    navigateToProfileHandler
  } = useAppEffects();

  return (
    <LoadingPage isLoading={isLoading}>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />

        <Route path={'seller/*'} element={
          <LayoutWithTopbar
          isAuthenticated={isAuthenticated}
          user={user}
          primaryNavigation={primaryNavigation}
          logoutHandler={logoutHandler}
          navigateToMyAccountHandler={navigateToMyAccountHandler}
          navigateToProfileHandler={navigateToProfileHandler}
        >
          <SellerApp
            isAuthenticated={isAuthenticated}
          />
        </LayoutWithTopbar>
        } />

        <Route path={'buyer/*'} element={<BuyerApp />} />

        <Route path={'auth/*'} element={<AuthApp />} />

        <Route path={'account/*'} element={
          <LayoutWithTopbar
            isAuthenticated={isAuthenticated}
            user={user}
            primaryNavigation={primaryNavigation}
            logoutHandler={logoutHandler}
            navigateToMyAccountHandler={navigateToMyAccountHandler}
            navigateToProfileHandler={navigateToProfileHandler}
          >
            <AccountApp />
          </LayoutWithTopbar>
        } />

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
      <Global styles={css({ body: { backgroundColor: variables.inputBackgroundColor } })} />
    </LoadingPage>
  );
};
