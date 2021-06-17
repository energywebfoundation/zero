import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { UiTheme } from '@energyweb/zero-theme';
import { StoreProvider } from '@energy-web-zero/store/configure';

ReactDOM.render(
  <StrictMode>
    <StoreProvider>
      <UiTheme>
        <App />
      </UiTheme>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
);
