import { render } from '@testing-library/react';

import Info from './Info';

describe('Info', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <Info popoverContent="popover text">
      <div>Info child component</div>
    </Info>
    );
    expect(baseElement).toBeTruthy();
  });
});
