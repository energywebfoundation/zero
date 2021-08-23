import { render } from '@testing-library/react';

import SellerAddFacilitiesLocationForm from './seller-add-facilities-location-form';

describe('SellerAddFacilitiesLocationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesLocationForm />);
    expect(baseElement).toBeTruthy();
  });
});
