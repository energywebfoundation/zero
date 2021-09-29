import { render } from '@testing-library/react';

import FacilityDocumentListContainer from './FacilityDocumentListContainer';

describe('FacilityDocumentListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FacilityDocumentListContainer
      data={[]}
      handleFacilityDocumentListChanged={
        () => console.log('handle change')
      }
    />);
    expect(baseElement).toBeTruthy();
  });
});
