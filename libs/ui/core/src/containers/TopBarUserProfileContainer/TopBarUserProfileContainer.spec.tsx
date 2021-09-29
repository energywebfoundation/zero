import { render } from '@testing-library/react';

import TopBarUserProfileContainer from './TopBarUserProfileContainer';

describe('TopBarUserProfileContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopBarUserProfileContainer />);
    expect(baseElement).toBeTruthy();
  });
});
