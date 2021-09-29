import { render } from '@testing-library/react';

import FileListItem from './FileListItem';

describe('FileListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FileListItem
      data={{
        ownerId: 1,
        id: 'ID432',
        filename: 'Photo.jpeg',
        mimetype: 'image/jpeg',
        fileType: 'company',
        url: 'http://photo.com',
        processingCompletedAt: new Date(Date.now()).toISOString(),
        uploadedAt: new Date(Date.now()).toISOString()
      }}
    />);
    expect(baseElement).toBeTruthy();
  });
});
