import { render } from '@testing-library/react';

import FileListContainer from './FileListContainer';

describe('FileListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FileListContainer
      open={true}
      handleCancel={() => console.log('cancel')}
      handleSubmitSelection={() => console.log("submit")}
    />);
    expect(baseElement).toBeTruthy();
  });
});
