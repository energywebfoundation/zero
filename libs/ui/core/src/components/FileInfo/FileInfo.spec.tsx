import { render } from '@testing-library/react';

import FileInfo from './FileInfo';

describe('FileInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileInfo id="ID-123" />);
    expect(baseElement).toBeTruthy();
  });
});
