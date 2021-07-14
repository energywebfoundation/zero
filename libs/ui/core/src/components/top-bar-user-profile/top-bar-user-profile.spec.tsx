import { render } from '@testing-library/react';

import TopBarUserProfile from './top-bar-user-profile';

describe('TopBarUserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopBarUserProfile />);
    expect(baseElement).toBeTruthy();
  });
});
