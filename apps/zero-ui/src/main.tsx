import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import { css, Global } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import '@energyweb/zero-ui-localization';
import { UiTheme } from '@energyweb/zero-ui-theme';
import { StoreProvider } from '@energyweb/zero-ui-store';
import { ApiProvider } from '@energyweb/zero-api-client';
import { App } from './app/app';
import './styles.scss';

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
