import { render } from '@testing-library/react';

import MainLandingPage from './main-landing-page';

describe('MainLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainLandingPage />);
    expect(baseElement).toBeTruthy();
  });
});
