import { render } from '@testing-library/react';

import LoadingPage from './loading-page';
import { HelmetProvider } from 'react-helmet-async';

describe('Loading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <LoadingPage />
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
