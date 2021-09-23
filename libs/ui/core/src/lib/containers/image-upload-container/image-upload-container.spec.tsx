import { render } from '@testing-library/react';

import ImageUploadContainer from './image-upload-container';

describe('ImageUploadContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageUploadContainer />);
    expect(baseElement).toBeTruthy();
  });
});
