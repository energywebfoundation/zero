import { render } from '@testing-library/react';

import LayoutWithTopbarContainer from './layout-with-topbar-container';

describe('LayoutWithTopbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutWithTopbarContainer />);
    expect(baseElement).toBeTruthy();
  });
});
