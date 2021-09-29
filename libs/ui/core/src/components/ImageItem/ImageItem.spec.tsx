import { render } from '@testing-library/react';

import ImageItem from './ImageItem';

describe('ImageItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageItem />);
    expect(baseElement).toBeTruthy();
  });
});
