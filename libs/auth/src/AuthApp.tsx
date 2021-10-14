
import { css, Global } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import { SignInPage, SignUpPage } from './pages';

export const AuthApp = () => {
  const theme = useTheme();
  return (
    <>
      <Routes>
        <Route path={'sign-in'} element={<SignInPage />} />
        <Route path={'sign-up'} element={<SignUpPage />} />
      </Routes>
      <Global styles={css({ body: { backgroundColor: theme.palette.primary.main } })} />
    </>
  )
};
