import { render } from '@testing-library/react';

import AuthLoginPage from './auth-login-page';

describe('AuthLoginPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthLoginPage />);
    expect(baseElement).toBeTruthy();
  });
});
