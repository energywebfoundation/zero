import styled from '@emotion/styled';
import AuthSignUpPage from '../auth-sign-up-page/auth-sign-up-page';
import { Route, Routes } from 'react-router-dom';
import AuthLoginPage from '../auth-login-page/auth-login-page';
import { memo } from 'react';
import AuthLogoutPage from '../auth-logout-page/auth-logout-page';

/* eslint-disable-next-line */
export interface AuthPageProps {}

const StyledAuthPage = styled.div``;

export const AuthPage = (props: AuthPageProps) => (
  <StyledAuthPage>
    <Routes>
      <Route path={'sign-in'} element={<AuthLoginPage />} />
      <Route path={'sign-up'} element={<AuthSignUpPage />} />
      <Route path={'sign-out'} element={<AuthLogoutPage />} />
    </Routes>
  </StyledAuthPage>
);

export default AuthPage;
