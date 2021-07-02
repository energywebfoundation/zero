import { FC } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SellerLandingPage } from '@energy-web-zero/seller';
import { BuyerLandingPage } from '@energy-web-zero/buyer';
import PageNotFoundPage from '../pages/page-not-found/page-not-found-page';
import TopNavBarContainer from '../containers/top-nav-bar-container/top-nav-bar-container';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <Container fixed>
      <Router>
        <TopNavBarContainer />
        <Routes>
          <Route path={'sellers'} element={<SellerLandingPage />} />
          <Route path={'buyers'} element={<BuyerLandingPage />} />
          <Route path={'*'} element={<PageNotFoundPage />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
