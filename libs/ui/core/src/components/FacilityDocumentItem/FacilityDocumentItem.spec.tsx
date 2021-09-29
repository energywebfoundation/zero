import { render } from '@testing-library/react';

import FacilityDocumentItem, {
  FacilityDocument,
} from './FacilityDocumentItem';

describe('FacilityDocumentItem', () => {
  it('should render', () => {
    const testDoc: FacilityDocument = {
      id: 'testid',
      description: 'Test description',
    };
    const removeDocumentItemHandlerMockFn = jest.fn();
    const descriptionChangeHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <FacilityDocumentItem
        id={testDoc.id}
        description={testDoc.description}
        handleDescriptionChange={descriptionChangeHandlerMockFn}
        handleRemoveDocumentItem={removeDocumentItemHandlerMockFn}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
