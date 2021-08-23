import { render } from '@testing-library/react';

import SellerAddFacilitiesLocationPage from './seller-add-facilities-location-page';

describe('SellerAddFacilitiesLocationPage', () => {
  it('should render successfully', () => {
    const submitHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <SellerAddFacilitiesLocationPage submitHandler={submitHandlerMockFn} />
    );
    expect(baseElement).toBeTruthy();
  });
});
