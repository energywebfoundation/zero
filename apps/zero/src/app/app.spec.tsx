import { render } from '@testing-library/react';
import '@energy-web-zero/localization';

import App from './app';
import { StoreProvider } from '@energy-web-zero/store/configure';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
