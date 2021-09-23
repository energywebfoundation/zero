import { render } from '@testing-library/react';

import FacilityDraftList from './facility-draft-list';

describe('FacilityDraftList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FacilityDraftList />);
    expect(baseElement).toBeTruthy();
  });
});
