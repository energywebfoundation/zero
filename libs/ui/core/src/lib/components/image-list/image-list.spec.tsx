import { render } from '@testing-library/react';

import ImageList from './image-list';

describe('ImageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageList />);
    expect(baseElement).toBeTruthy();
  });
});
