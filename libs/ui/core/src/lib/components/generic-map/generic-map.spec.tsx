import { render } from '@testing-library/react';

import GenericMap from './generic-map';

describe('GenericMap', () => {
  it('should render successfully', () => {
    const locationChangeHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <GenericMap
        coordinates={[20, 20]}
        handleLocationChange={locationChangeHandlerMockFn}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
