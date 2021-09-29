import { render } from '@testing-library/react';

import ImageUploadContainer from './ImageUploadContainer';

describe('ImageUploadContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <ImageUploadContainer
      handleUploadSuccess={() => console.log('upload success')}
    />);
    expect(baseElement).toBeTruthy();
  });
});
