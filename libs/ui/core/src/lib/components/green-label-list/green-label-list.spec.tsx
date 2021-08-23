import { render } from '@testing-library/react';

import GreenLabelList from './green-label-list';

describe('GreenLabelList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GreenLabelList />);
    expect(baseElement).toBeTruthy();
  });
});
