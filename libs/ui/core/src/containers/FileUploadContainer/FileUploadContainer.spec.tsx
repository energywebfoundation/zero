import { render } from '@testing-library/react';

import FileUploadContainer from './FileUploadContainer';

describe('FileUploadContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FileUploadContainer
      handleSubmitSelection={() => console.log('submit')}
      handleFileListChanged={() => console.log('file change')}
    />);
    expect(baseElement).toBeTruthy();
  });
});
