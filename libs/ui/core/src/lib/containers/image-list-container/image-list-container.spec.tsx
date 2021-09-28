import { render } from '@testing-library/react';

import ImageListContainer from './image-list-container';

describe('ImageListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageListContainer />);
    expect(baseElement).toBeTruthy();
  });
});
