import { render } from '@testing-library/react';

import LearnMore from './learn-more';

describe('LearnMore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LearnMore />);
    expect(baseElement).toBeTruthy();
  });
});
