import { render } from '@testing-library/react';

import FileInfo from './file-info';

describe('FileInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileInfo />);
    expect(baseElement).toBeTruthy();
  });
});
