import { render } from '@testing-library/react';

import ImageItem from './image-item';

describe('ImageItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageItem />);
    expect(baseElement).toBeTruthy();
  });
});
