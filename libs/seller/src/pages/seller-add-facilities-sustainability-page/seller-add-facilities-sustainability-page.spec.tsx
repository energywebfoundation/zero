import { render } from '@testing-library/react';

import SellerAddFacilitiesSustainabilityPage from './seller-add-facilities-sustainability-page';

describe('SellerAddFacilitiesSustainabilityPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesSustainabilityPage />);
    expect(baseElement).toBeTruthy();
  });
});
