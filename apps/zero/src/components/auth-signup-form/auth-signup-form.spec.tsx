import { render } from '@testing-library/react';

import AuthSignupForm from './auth-signup-form';

describe('AuthSignupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthSignupForm />);
    expect(baseElement).toBeTruthy();
  });
});
