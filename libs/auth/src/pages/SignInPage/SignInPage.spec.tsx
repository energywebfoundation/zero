import { render } from '@testing-library/react';

import { SignInPage } from './SignInPage';

describe('AuthLoginPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInPage />);
    expect(baseElement).toBeTruthy();
  });
});
