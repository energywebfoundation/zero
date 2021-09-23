import { render } from '@testing-library/react';

import FacilityDraftListContainer from './facility-draft-list-container';

describe('FacilityDraftListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FacilityDraftListContainer />);
    expect(baseElement).toBeTruthy();
  });
});
