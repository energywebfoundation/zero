import { render } from '@testing-library/react';

import { SellerLandingPage } from './LandingPage';
import { UiTheme } from '@energyweb/zero-ui-theme';

describe('SellerLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiTheme>
        <SellerLandingPage />
      </UiTheme>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <UiTheme>
        <SellerLandingPage />
      </UiTheme>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
