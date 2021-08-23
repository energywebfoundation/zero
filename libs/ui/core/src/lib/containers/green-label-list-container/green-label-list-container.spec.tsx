import { render } from '@testing-library/react';

import GreenLabelListContainer from './green-label-list-container';

describe('GreenLabelListContainer', () => {
  it('should render successfully', () => {
    const valueChangedHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <GreenLabelListContainer
        handleValueChanged={valueChangedHandlerMockFn}
        data={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
