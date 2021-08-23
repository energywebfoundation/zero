import { render } from '@testing-library/react';

import CharacterCountLimit from './character-count-limit';

describe('CharacterCountLimit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CharacterCountLimit />);
    expect(baseElement).toBeTruthy();
  });
});
