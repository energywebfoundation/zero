import { render } from '@testing-library/react';

import LayoutNoTopbar from './layout-no-topbar';

describe('LayoutNoTopbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutNoTopbar />);
    expect(baseElement).toBeTruthy();
  });
});
