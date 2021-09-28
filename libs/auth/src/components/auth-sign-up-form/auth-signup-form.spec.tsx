import { render } from '@testing-library/react';

import AuthSignUpForm from './auth-sign-up-form';

describe('AuthSignupForm', () => {
  it('should render successfully', () => {
    const handleFormSubmitMockFn = jest.fn();
    const { baseElement } = render(
      <AuthSignUpForm submitHandler={handleFormSubmitMockFn} />
    );
    expect(baseElement).toBeTruthy();
  });
});
