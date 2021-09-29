import { render } from '@testing-library/react';

import FileList from './FileList';

describe('FileList', () => {
  it('should render successfully', () => {
    const cancelHandlerMockFn = jest.fn();
    const submitHandlerMockFn = jest.fn();
    const selectionChangeHandlerMockFn = jest.fn();

    const { baseElement } = render(
      <FileList
        handleSelectionChange={selectionChangeHandlerMockFn}
        handleCancel={cancelHandlerMockFn}
        handleSubmit={submitHandlerMockFn}
        fileList={[]}
        selectedFileIdList={[]}
        loading={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
