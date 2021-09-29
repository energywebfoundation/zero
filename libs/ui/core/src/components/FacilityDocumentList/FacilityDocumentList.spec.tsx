import { render } from '@testing-library/react';

import FacilityDocumentList from './FacilityDocumentList';

describe('FacilityDocumentList', () => {
  it('should render successfully', () => {
    const removeFacilityDocumentHandlerMockFn = jest.fn();
    const descriptionChangedHandlerMockFn = jest.fn();
    const submitSelectionHandlerMockFn = jest.fn();
    const fileListChangedHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <FacilityDocumentList
        documentList={[]}
        handleFileListChanged={fileListChangedHandlerMockFn}
        handleFileSelectionSubmit={submitSelectionHandlerMockFn}
        handleDescriptionChanged={descriptionChangedHandlerMockFn}
        handleRemoveFacilityDocument={removeFacilityDocumentHandlerMockFn}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
