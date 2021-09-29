import { render } from '@testing-library/react';

import GreenLabelForm from './GreenLabelForm';

describe('GreenLabelForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <GreenLabelForm submitHandler={async () => console.log("submit")} />
    );
    expect(baseElement).toBeTruthy();
  });
});
