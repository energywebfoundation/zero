import { render } from '@testing-library/react';

import GenericFormContextProvider from './generic-form-context-provider';

describe('GenericFormContextProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormContextProvider />);
    expect(baseElement).toBeTruthy();
  });
});
