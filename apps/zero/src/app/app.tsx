import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SellerLandingPage } from '@energy-web-zero/seller';
import { BuyerLandingPage } from '@energy-web-zero/buyer';
import { AuthPage } from '@energy-web-zero/ui-auth';
import { useAppEffects } from './app.effects';
import { AccountPage } from '@energy-web-zero/ui/account';
import { NotFoundPage } from '@energyweb/zero-ui';
import LoadingPage from '../../../../libs/ui/core/src/lib/pages/loading-page/loading-page';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: FC<AppProps> = memo(() => {
  const { selectors } = useAppEffects();
  return (
    <LoadingPage isLoading={selectors.isLoading}>
      <Routes>
        <Route path={'auth/*'} element={<AuthPage />} />
        <Route path={'sellers'} element={<SellerLandingPage />} />
        <Route path={'buyers'} element={<BuyerLandingPage />} />
        <Route path={'account/*'} element={<AccountPage />} />
        <Route
          path={'*'}
          element={
            <NotFoundPage
              isAuthenticated={selectors.isAuthenticated}
              nonAuthenticatedHomeRoute={'/auth/sign-in'}
              authenticatedHomeRoute={selectors.authenticatedHomeRoute}
            />
          }
        />
      </Routes>
    </LoadingPage>
  );
});

App.displayName = 'App';

export default App;
