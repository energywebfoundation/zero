import { render } from '@testing-library/react';
import '@energyweb/zero-ui-localization';
import { MemoryRouter } from 'react-router-dom';
import TopNavBarContainer from './TopNavBarContainer';

describe('TopNavBarContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <TopNavBarContainer />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
