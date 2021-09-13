import { render } from '@testing-library/react';

import SellerAddFacilitiesBasicInformationForm from './seller-add-facilities-basic-information-form';

describe('SellerAddFacilitiesBasicInformationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerAddFacilitiesBasicInformationForm />);
    expect(baseElement).toBeTruthy();
  });
});
