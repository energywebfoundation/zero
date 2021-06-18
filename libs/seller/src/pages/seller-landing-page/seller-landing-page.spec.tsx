import { render } from '@testing-library/react';

import SellerLandingPage from './seller-landing-page';

describe('SellerLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerLandingPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(<SellerLandingPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
