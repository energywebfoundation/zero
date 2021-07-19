import { render } from '@testing-library/react';

import AccountBuyerDashboardPage from './account-buyer-dashboard-page';

describe('AccountBuyerDashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountBuyerDashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
