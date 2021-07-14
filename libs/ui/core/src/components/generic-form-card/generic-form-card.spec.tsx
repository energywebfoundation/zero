import { render } from '@testing-library/react';

import GenericFormCard from './generic-form-card';

describe('GenericFormCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormCard />);
    expect(baseElement).toBeTruthy();
  });
});
