import { render } from '@testing-library/react';

import DisabledOverlay from './disabled-overlay';

describe('DisabledOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DisabledOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
