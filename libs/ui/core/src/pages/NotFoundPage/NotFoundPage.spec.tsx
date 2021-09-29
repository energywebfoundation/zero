import { render } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';
import { HelmetProvider } from 'react-helmet-async';

describe('NotFoundPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <NotFoundPage
          isAuthenticated
          authenticatedHomeRoute="/"
          nonAuthenticatedHomeRoute="/non"
        />
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
