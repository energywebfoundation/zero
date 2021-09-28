import { render } from '@testing-library/react';

import SellerLandingPage from './seller-landing-page';
import { StoreProvider } from '@energyweb/zero-ui-store';
import { UiTheme } from '@energyweb/zero-ui-theme';

describe('SellerLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiTheme>
        <StoreProvider>
          <SellerLandingPage />
        </StoreProvider>
      </UiTheme>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <UiTheme>
        <StoreProvider>
          <SellerLandingPage />
        </StoreProvider>
      </UiTheme>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
