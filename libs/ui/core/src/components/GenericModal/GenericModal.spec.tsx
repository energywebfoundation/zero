import { render } from '@testing-library/react';

import GenericModal from './GenericModal';

describe('GenericModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <GenericModal open={true} handleOnClose={() => console.log('close')}>
      <div>Child inside modal</div>
    </GenericModal>
    );
    expect(baseElement).toBeTruthy();
  });
});
