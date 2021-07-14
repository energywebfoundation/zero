import { render } from '@testing-library/react';

import NavLinkItem from './nav-link-item';

describe('NavLinkItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavLinkItem />);
    expect(baseElement).toBeTruthy();
  });
});
