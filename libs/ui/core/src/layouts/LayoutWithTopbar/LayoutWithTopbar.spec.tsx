import { render } from '@testing-library/react';

import LayoutWithTopbarContainer from './LayoutWithTopbar';

describe('LayoutWithTopbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <LayoutWithTopbarContainer>
      <div></div>
    </LayoutWithTopbarContainer>);
    expect(baseElement).toBeTruthy();
  });
});
