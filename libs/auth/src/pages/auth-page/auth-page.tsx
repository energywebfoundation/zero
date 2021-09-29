import { Route, Routes } from 'react-router-dom';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import AuthSignUpPage from '../auth-sign-up-page/auth-sign-up-page';
import AuthLoginPage from '../auth-login-page/auth-login-page';

export const AuthPage = () => (
  <LayoutWithTopbarContainer disableTopbar>
    <Routes>
      <Route path={'sign-in'} element={<AuthLoginPage />} />
      <Route path={'sign-up'} element={<AuthSignUpPage />} />
    </Routes>
  </LayoutWithTopbarContainer>
);

export default AuthPage;
