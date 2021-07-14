import { render } from '@testing-library/react';

import ApiProvider from './api-provider';

describe('ApiProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiProvider />);
    expect(baseElement).toBeTruthy();
  });
});
