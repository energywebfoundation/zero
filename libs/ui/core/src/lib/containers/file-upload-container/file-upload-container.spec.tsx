import { render } from '@testing-library/react';

import FileUploadContainer from './file-upload-container';

describe('FileUploadContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileUploadContainer />);
    expect(baseElement).toBeTruthy();
  });
});
