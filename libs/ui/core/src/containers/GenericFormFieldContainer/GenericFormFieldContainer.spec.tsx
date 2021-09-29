import { render } from '@testing-library/react';

import GenericFormFieldContainer from './GenericFormFieldContainer';

describe('GenericFormFieldContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GenericFormFieldContainer fieldName={'testName'} />
    );
    expect(baseElement).toBeTruthy();
  });
});
