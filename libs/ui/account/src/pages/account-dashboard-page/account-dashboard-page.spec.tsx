import { render } from '@testing-library/react';

import AccountDashboardPage from './account-dashboard-page';

describe('AccountDashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountDashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
