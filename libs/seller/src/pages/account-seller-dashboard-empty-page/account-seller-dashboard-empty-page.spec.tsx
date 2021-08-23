import { render } from '@testing-library/react';

import AccountSellerDashboardEmptyPage from './account-seller-dashboard-empty-page';

describe('AccountSellerDashboardEmptyPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountSellerDashboardEmptyPage />);
    expect(baseElement).toBeTruthy();
  });
});
