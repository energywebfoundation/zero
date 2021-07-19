import { render } from '@testing-library/react';

import UiAccount from './ui-account';

describe('UiAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiAccount />);
    expect(baseElement).toBeTruthy();
  });
});
