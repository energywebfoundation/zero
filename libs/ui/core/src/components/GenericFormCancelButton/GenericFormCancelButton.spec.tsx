import { render } from '@testing-library/react';

import GenericFormCancelButton from './GenericFormCancelButton';

describe('GenericFormCancelButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GenericFormCancelButton
        handleCancel={() => console.log('cancel')}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
