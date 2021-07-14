import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import '@energy-web-zero/localization';

import App from './app/app';
import { UiTheme } from '@energyweb/zero-theme';
import { StoreProvider } from '@energy-web-zero/store/configure';
import { ApiProvider } from '@energyweb/zero-ui-api';
import { SnackbarProvider } from 'notistack';
ReactDOM.render(
  <StrictMode>
    <StoreProvider>
      <ApiProvider>
        <UiTheme>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </UiTheme>
      </ApiProvider>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
);
