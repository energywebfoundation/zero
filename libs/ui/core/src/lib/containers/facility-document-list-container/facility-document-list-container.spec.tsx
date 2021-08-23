import { render } from '@testing-library/react';

import FacilityDocumentListContainer from './facility-document-list-container';

describe('FacilityDocumentListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FacilityDocumentListContainer />);
    expect(baseElement).toBeTruthy();
  });
});
