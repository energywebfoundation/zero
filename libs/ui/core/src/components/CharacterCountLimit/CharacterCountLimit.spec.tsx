import { render } from '@testing-library/react';

import CharacterCountLimit from './CharacterCountLimit';

describe('CharacterCountLimit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CharacterCountLimit characterCountLimit={4} value="1234" />);
    expect(baseElement).toBeTruthy();
  });
});
