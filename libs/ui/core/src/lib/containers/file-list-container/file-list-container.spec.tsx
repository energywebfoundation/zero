import { render } from '@testing-library/react';

import FileListContainer from './file-list-container';

describe('FileListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileListContainer />);
    expect(baseElement).toBeTruthy();
  });
});
