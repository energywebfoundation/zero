import { render } from '@testing-library/react';

import FacilityDraftListPage from './facility-draft-list-page';

describe('FacilityDraftListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FacilityDraftListPage />);
    expect(baseElement).toBeTruthy();
  });
});
