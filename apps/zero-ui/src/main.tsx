import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import localforage from 'localforage';
import '@energy-web-zero/ui-localization';
import './styles.scss';

import App from './app/app';
import { UiTheme } from '@energyweb/zero-theme';
import { StoreProvider } from '@energy-web-zero/store';
import { ApiProvider } from '@energy-web-zero/api-client';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'energyWebZero',
  version: 0.3,
  storeName: 'zeroStore',
});

ReactDOM.render(
  <StrictMode>
    <Router>
      <HelmetProvider>
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
              <SnackbarProvider
                domRoot={
                  document
                    .getElementsByClassName('notificationAreaBox')
                    .item(0) as HTMLElement
                }
                autoHideDuration={4000}
                maxSnack={4}
              >
                <App />
              </SnackbarProvider>
            </UiTheme>
          </ApiProvider>
        </StoreProvider>
      </HelmetProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
