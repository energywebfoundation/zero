import { render } from '@testing-library/react';

import ImageUpload from './image-upload';

describe('ImageUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageUpload />);
    expect(baseElement).toBeTruthy();
  });
});
