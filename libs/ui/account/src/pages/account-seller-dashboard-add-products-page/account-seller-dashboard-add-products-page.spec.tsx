import { render } from '@testing-library/react';

import AccountSellerDashboardAddProductsPage from './account-seller-dashboard-add-products-page';

describe('AccountSellerDashboardAddProductsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountSellerDashboardAddProductsPage />);
    expect(baseElement).toBeTruthy();
  });
});
