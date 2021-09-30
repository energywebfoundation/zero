import { Route, Routes } from 'react-router-dom';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import { SignInPage, SignUpPage } from './pages';

export const AuthPage = () => (
  <LayoutWithTopbarContainer disableTopbar>
    <Routes>
      <Route path={'sign-in'} element={<SignInPage />} />
      <Route path={'sign-up'} element={<SignUpPage />} />
    </Routes>
  </LayoutWithTopbarContainer>
);

export default AuthPage;
