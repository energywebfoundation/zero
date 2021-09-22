import { render } from '@testing-library/react';

import GreenLabelListItem from './green-label-list-item';

describe('GreenLabelListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GreenLabelListItem />);
    expect(baseElement).toBeTruthy();
  });
});
