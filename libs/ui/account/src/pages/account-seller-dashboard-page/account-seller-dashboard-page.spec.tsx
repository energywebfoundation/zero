import { render } from '@testing-library/react';

import AccountSellerDashboardPage from './account-seller-dashboard-page';

describe('AccountSellerDashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountSellerDashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
