import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import '@energyweb/zero-ui-localization';
import { UiTheme } from '@energyweb/zero-ui-theme';
import { ApiProvider } from '@energyweb/zero-api-client';
import { App } from './app/app';
import './styles.scss';

ReactDOM.render(
  <StrictMode>
    <Router>
      <HelmetProvider>
        <ApiProvider>
          <UiTheme>
            <App />
          </UiTheme>
        </ApiProvider>
      </HelmetProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
