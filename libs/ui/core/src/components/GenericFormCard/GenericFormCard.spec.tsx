import { render } from '@testing-library/react';

import GenericFormCard from './GenericFormCard';

describe('GenericFormCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <GenericFormCard>
      <div>Child</div>
    </GenericFormCard>
    );
    expect(baseElement).toBeTruthy();
  });
});
