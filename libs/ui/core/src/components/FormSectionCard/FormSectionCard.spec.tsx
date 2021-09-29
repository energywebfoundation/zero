import { render } from '@testing-library/react';

import FormSectionCard from './FormSectionCard';

describe('FormSectionCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FormSectionCard>
      <div>Hey</div>
    </FormSectionCard>);
    expect(baseElement).toBeTruthy();
  });
});
