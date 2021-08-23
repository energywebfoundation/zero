import { render } from '@testing-library/react';

import SellerAddFacilitiesSustainabilityForm from './seller-add-facilities-sustainability-form';

describe('SellerAddFacilitiesSustainabilityForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesSustainabilityForm />);
    expect(baseElement).toBeTruthy();
  });
});
