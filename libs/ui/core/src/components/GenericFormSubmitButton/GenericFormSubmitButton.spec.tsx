import { render } from '@testing-library/react';

import GenericFormSubmitButton from './GenericFormSubmitButton';

describe('GenericFormSubmitButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormSubmitButton />);
    expect(baseElement).toBeTruthy();
  });
});
