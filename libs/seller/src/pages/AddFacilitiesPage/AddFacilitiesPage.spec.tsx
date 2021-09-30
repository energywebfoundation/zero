import { render } from '@testing-library/react';

import SellerAddFacilitiesPage from './AddFacilitiesPage';

describe('SellerAddFacilitiesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesPage />);
    expect(baseElement).toBeTruthy();
  });
});
