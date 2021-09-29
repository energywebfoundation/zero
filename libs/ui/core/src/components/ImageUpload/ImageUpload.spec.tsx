import { render } from '@testing-library/react';

import ImageUpload from './ImageUpload';

describe('ImageUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <ImageUpload
      handleOnDrop={() => console.log('handle on drop')}
      handleFileValidationError={() => console.log('file validation error')}
    />);
    expect(baseElement).toBeTruthy();
  });
});
