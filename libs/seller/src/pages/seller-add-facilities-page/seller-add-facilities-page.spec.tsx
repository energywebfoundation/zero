import { render } from '@testing-library/react';

import SellerAddFacilitiesPage from './seller-add-facilities-page';

describe('SellerAddFacilitiesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesPage />);
    expect(baseElement).toBeTruthy();
  });
});
