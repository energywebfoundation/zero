import { render } from '@testing-library/react';
import { GreenLabelTypeEnum } from '../GreenLabelForm/GreenLabelForm';

import GreenLabelListItem from './GreenLabelListItem';

describe('GreenLabelListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <GreenLabelListItem
      data={{ type: GreenLabelTypeEnum.BraMiljoval, proofDocumentId: '123' }}
      handleUpdateGreenLabel={() => console.log('update')}
      handleDeleteGreenLabel={() => console.log('delete')}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
