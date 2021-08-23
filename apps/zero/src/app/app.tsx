import { FC, memo } from 'react';
import { Container } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import { SellerLandingPage } from '@energy-web-zero/seller';
import { BuyerLandingPage } from '@energy-web-zero/buyer';
import PageNotFoundPage from '../pages/page-not-found/page-not-found-page';
import TopNavBarContainer from '../containers/top-nav-bar-container/top-nav-bar-container';
import { AuthPage } from '@energy-web-zero/ui-auth';
import { useAppEffects } from './app.effects';
import { AccountPage } from '@energy-web-zero/ui/account';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: FC<AppProps> = memo(() => {
  useAppEffects();
  return (
    <>
      <TopNavBarContainer />
      <Container fixed sx={{ pt: '98px' }}>
        <Routes>
          <Route path={'auth/*'} element={<AuthPage />} />
          <Route path={'sellers'} element={<SellerLandingPage />} />
          <Route path={'buyers'} element={<BuyerLandingPage />} />
          <Route path={'account/*'} element={<AccountPage />} />
          <Route path={'*'} element={<PageNotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
});

App.displayName = 'App';

export default App;
