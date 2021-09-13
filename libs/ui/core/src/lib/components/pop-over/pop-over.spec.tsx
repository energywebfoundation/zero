import { render } from '@testing-library/react';

import PopOver from './pop-over';

describe('PopOver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopOver />);
    expect(baseElement).toBeTruthy();
  });
});
