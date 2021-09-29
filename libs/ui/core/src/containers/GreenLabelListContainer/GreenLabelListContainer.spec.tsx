import { render } from '@testing-library/react';

import GreenLabelListContainer from './GreenLabelListContainer';

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
