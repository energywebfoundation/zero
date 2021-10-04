import { render } from '@testing-library/react';

import { SellerDashboardPage } from './SellerDashboardPage';

describe('AccountSellerDashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellerDashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
