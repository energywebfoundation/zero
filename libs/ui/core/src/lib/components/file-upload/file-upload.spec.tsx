import { render } from '@testing-library/react';

import FileUpload from './file-upload';

describe('FileUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileUpload />);
    expect(baseElement).toBeTruthy();
  });
});
