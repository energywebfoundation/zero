import { render } from '@testing-library/react';

import SellerAddFacilitiesImagesPage from './seller-add-facilities-images-page';

describe('SellerAddFacilitiesImagesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesImagesPage />);
    expect(baseElement).toBeTruthy();
  });
});
