import { Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@material-ui/core';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import { SignInPage, SignUpPage } from './pages';

export const AuthApp = () => {
  const theme = useTheme();

  return (
  <LayoutWithTopbarContainer
    disableTopbar
    bgColor={theme.palette.primary.main}
  >
    <Box>
      <Routes>
        <Route path={'sign-in'} element={<SignInPage />} />
        <Route path={'sign-up'} element={<SignUpPage />} />
      </Routes>
    </Box>
  </LayoutWithTopbarContainer>
)
};
