import { ThemeProvider } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import makeThemeConfig from './utils/makeThemeConfig';
import CssBaseline from '@material-ui/core/CssBaseline';
/* eslint-disable-next-line */
export interface UiThemeProps {
  children: ReactNode;
}

const { materialTheme } = makeThemeConfig();

export const UiTheme = ({ children }: UiThemeProps) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
  </>
);

export default UiTheme;
