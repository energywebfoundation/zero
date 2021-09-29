import { render } from '@testing-library/react';

import LayoutNoTopbar from './LayoutNoTopbar';

describe('LayoutNoTopbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutNoTopbar><div></div></LayoutNoTopbar>);
    expect(baseElement).toBeTruthy();
  });
});
