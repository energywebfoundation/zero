import { render } from '@testing-library/react';

import GenericFormMultiStepContextProvider from './generic-form-multi-step-context-provider';

describe('GenericFormMultiStepContextProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormMultiStepContextProvider />);
    expect(baseElement).toBeTruthy();
  });
});
