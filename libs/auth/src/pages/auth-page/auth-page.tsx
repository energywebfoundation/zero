import AuthSignUpPage from '../auth-sign-up-page/auth-sign-up-page';
import { Route, Routes } from 'react-router-dom';
import AuthLoginPage from '../auth-login-page/auth-login-page';
import AuthLogoutPage from '../auth-logout-page/auth-logout-page';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';

export const AuthPage = () => (
  <LayoutWithTopbarContainer disableTopbar>
    <Routes>
      <Route path={'sign-in'} element={<AuthLoginPage />} />
      <Route path={'sign-up'} element={<AuthSignUpPage />} />
      <Route path={'sign-out'} element={<AuthLogoutPage />} />
    </Routes>
  </LayoutWithTopbarContainer>
);

export default AuthPage;
