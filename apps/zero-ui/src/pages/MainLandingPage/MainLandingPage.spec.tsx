import { render } from '@testing-library/react';

import MainLandingPage from './MainLandingPage';

describe('MainLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainLandingPage />);
    expect(baseElement).toBeTruthy();
  });
});
