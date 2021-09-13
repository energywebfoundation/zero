import { render } from '@testing-library/react';

import SellerAddFacilitiesImagesForm from './seller-add-facilities-images-form';

describe('SellerAddFacilitiesImagesForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesImagesForm />);
    expect(baseElement).toBeTruthy();
  });
});
