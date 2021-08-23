import { render } from '@testing-library/react';

import TopBarUserProfileContainer from './top-bar-user-profile-container';

describe('TopBarUserProfileContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopBarUserProfileContainer />);
    expect(baseElement).toBeTruthy();
  });
});
