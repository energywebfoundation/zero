import { render } from '@testing-library/react';

import FileUpload from './FileUpload';

describe('FileUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FileUpload
      handleAcceptedFilesChange={(files) => console.log(files)}
      handleSubmitSelection={(fileIdList) => console.log(fileIdList)}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
