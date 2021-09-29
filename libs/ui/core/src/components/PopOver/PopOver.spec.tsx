import { render } from '@testing-library/react';

import PopOver from './PopOver';

describe('PopOver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <PopOver popoverContent="Text content">
      <div>Child</div>
    </PopOver>
    );
    expect(baseElement).toBeTruthy();
  });
});
