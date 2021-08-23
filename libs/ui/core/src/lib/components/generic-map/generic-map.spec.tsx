import { render } from '@testing-library/react';

import GenericMap from './generic-map';

describe('GenericMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericMap />);
    expect(baseElement).toBeTruthy();
  });
});
