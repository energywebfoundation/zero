import { render } from '@testing-library/react';

import TopBarUserProfile from './TopBarUserProfile';

describe('TopBarUserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <TopBarUserProfile
      data={null}
      navigateToMyAccountHandler={() => console.log('navigate to my account')}
      navigateToProfileHandler={() => console.log('navigate to profile')}
      logoutHandler={() => console.log('logout handler')}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
