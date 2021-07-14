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
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </UiTheme>
        </ApiProvider>
      </StoreProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
