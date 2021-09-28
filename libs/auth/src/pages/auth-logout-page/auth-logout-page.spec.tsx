import { render } from '@testing-library/react';

import AuthLogoutPage from './auth-logout-page';

describe('AuthLogoutPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthLogoutPage />);
    expect(baseElement).toBeTruthy();
  });
});
