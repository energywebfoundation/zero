import { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeThemeConfig } from './utils/makeThemeConfig';

export interface UiThemeProps {
  children: ReactNode;
}

const { materialTheme } = makeThemeConfig();

export const UiTheme = ({ children }: UiThemeProps) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={materialTheme}>
      {children}
    </ThemeProvider>
  </>
);
