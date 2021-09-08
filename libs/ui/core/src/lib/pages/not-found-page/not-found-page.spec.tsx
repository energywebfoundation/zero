import { render } from '@testing-library/react';

import NotFoundPage from './not-found-page';
import { HelmetProvider } from 'react-helmet-async';

describe('NotFoundPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <NotFoundPage />
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
