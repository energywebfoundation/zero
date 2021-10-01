import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import { SignInPage, SignUpPage } from './pages';

export const AuthPage = () => {
  const theme = useTheme();

  return (
  <LayoutWithTopbarContainer
    disableTopbar
    bgColor={theme.palette.primary.main}
  >
    <Routes>
      <Route path={'sign-in'} element={<SignInPage />} />
      <Route path={'sign-up'} element={<SignUpPage />} />
    </Routes>
  </LayoutWithTopbarContainer>
)
};

export default AuthPage;
