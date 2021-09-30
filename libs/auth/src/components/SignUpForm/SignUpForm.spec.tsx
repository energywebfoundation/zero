import { render } from '@testing-library/react';

import { SignUpForm } from './SignUpForm';

describe('AuthSignupForm', () => {
  it('should render successfully', () => {
    const handleFormSubmitMockFn = jest.fn();
    const { baseElement } = render(
      <SignUpForm submitHandler={handleFormSubmitMockFn} />
    );
    expect(baseElement).toBeTruthy();
  });
});
