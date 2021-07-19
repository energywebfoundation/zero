import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import localforage from 'localforage';
import '@energy-web-zero/localization';

import App from './app/app';
import { UiTheme } from '@energyweb/zero-theme';
import { StoreProvider } from '@energy-web-zero/store-configure';
import { ApiProvider } from '@energyweb/zero-ui-api';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { Helmet } from 'react-helmet';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'energyWebZero',
  version: 0.3,
  storeName: 'zeroStore',
});

ReactDOM.render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <ApiProvider>
          <UiTheme>
            <Global
              styles={css`
                body {
                  background: #2d1155;
                }
              `}
            />
            <Helmet>
              <title>Energy Web Zero</title>
            </Helmet>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              autoHideDuration={20}
              maxSnack={10}
            >
              <App />
            </SnackbarProvider>
          </UiTheme>
        </ApiProvider>
      </StoreProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
