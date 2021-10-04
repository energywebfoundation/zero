import { render } from '@testing-library/react';

import { SignUpPage } from './SignUpPage';

describe('AuthSignupPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpPage />);
    expect(baseElement).toBeTruthy();
  });
});
