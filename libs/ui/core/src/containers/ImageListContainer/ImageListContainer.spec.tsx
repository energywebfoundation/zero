import { render } from '@testing-library/react';

import ImageListContainer from './ImageListContainer';

describe('ImageListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageListContainer imageList={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
