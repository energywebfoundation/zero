import { render } from '@testing-library/react';

import SimpleSearchForm from './simple-search-form';

describe('SimpleSearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleSearchForm />);
    expect(baseElement).toBeTruthy();
  });
});
