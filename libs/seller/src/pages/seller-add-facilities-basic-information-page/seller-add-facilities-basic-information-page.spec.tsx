import { render } from '@testing-library/react';

import SellerAddFacilitiesBasicInformationPage from './seller-add-facilities-basic-information-page';

describe('SellerAddFacilitiesBasicInformationPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesBasicInformationPage />);
    expect(baseElement).toBeTruthy();
  });
});
