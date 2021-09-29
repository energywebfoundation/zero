import { render } from '@testing-library/react';

import ProcessingContainer from './ProcessingContainer';

describe('ProcessingContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ProcessingContainer
        isProcessing={true}
        children={<div>Example content</div>}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
