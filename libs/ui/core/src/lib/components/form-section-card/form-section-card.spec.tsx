import { render } from '@testing-library/react';

import FormSectionCard from './form-section-card';

describe('FormSectionCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSectionCard />);
    expect(baseElement).toBeTruthy();
  });
});
