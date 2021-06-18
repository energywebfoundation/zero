import { FC } from 'react';
import { AppBar, Container, IconButton, Toolbar } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from '@material-ui/icons/Menu';
import MainLandingPage from '../pages/main-landing-page/main-landing-page';
import { SellerLandingPage } from '@energy-web-zero/seller';
import { BuyerLandingPage } from '@energy-web-zero/buyer';
import PageNotFoundPage from '../pages/page-not-found/page-not-found-page';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: FC<AppProps> = () => (
  <Router>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Container>
      <Routes>
        <Route path={'/'} element={<MainLandingPage />} />
        <Route path={'sellers'} element={<SellerLandingPage />} />
        <Route path={'buyers'} element={<BuyerLandingPage />} />
        <Route path={'*'} element={<PageNotFoundPage />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
