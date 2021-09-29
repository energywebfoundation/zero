import { render } from '@testing-library/react';
import '@energyweb/zero-ui-localization';
import { StoreProvider } from '@energyweb/zero-ui-store';
import { MemoryRouter } from 'react-router-dom';
import TopNavBarContainer from './TopNavBarContainer';

describe('TopNavBarContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <StoreProvider>
          <TopNavBarContainer />
        </StoreProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
