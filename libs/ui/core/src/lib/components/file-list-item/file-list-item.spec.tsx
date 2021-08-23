import { render } from '@testing-library/react';

import FileListItem from './file-list-item';

describe('FileListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileListItem />);
    expect(baseElement).toBeTruthy();
  });
});
