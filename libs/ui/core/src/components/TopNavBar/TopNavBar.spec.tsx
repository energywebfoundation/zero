import { render } from '@testing-library/react';
import '@energyweb/zero-ui-localization';

import TopNavBar from './TopNavBar';

describe('TopNavBar', () => {
  it('should render successfully', () => {
    const languageChangeHandlerMockFn = jest.fn();
    const navigateHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <TopNavBar
        isAuthenticated
        handleLanguageChange={languageChangeHandlerMockFn}
        handleNavigate={navigateHandlerMockFn}
        primaryNavigationItemList={[]}
        secondaryNavigationItemList={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
