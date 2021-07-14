import { render } from '@testing-library/react';

import GenericFormSubmitButton from './generic-form-submit-button';

describe('GenericFormSubmitButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormSubmitButton />);
    expect(baseElement).toBeTruthy();
  });
});
