import { render } from '@testing-library/react';

import LoadingPage from './LoadingPage';
import { HelmetProvider } from 'react-helmet-async';

describe('Loading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <LoadingPage isLoading>
          <div></div>
        </LoadingPage>
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
