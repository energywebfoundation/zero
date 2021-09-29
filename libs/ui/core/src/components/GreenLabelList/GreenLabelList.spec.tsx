import { render } from '@testing-library/react';

import GreenLabelList from './GreenLabelList';

describe('GreenLabelList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <GreenLabelList
      greenLabelList={[]}
      handleAddNewGreenLabel={() => {console.log('add new')}}
      handleDeleteGreenLabel={() => {console.log('delete')}}
      handleUpdateGreenLabel={() => {console.log('update')}}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
