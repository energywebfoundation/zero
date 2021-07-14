import { render } from '@testing-library/react';

import AuthSignUpPage from './auth-sign-up-page';

describe('AuthSignupPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthSignUpPage />);
    expect(baseElement).toBeTruthy();
  });
});
