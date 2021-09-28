import { render } from '@testing-library/react';

import TopNavBar from './top-nav-bar';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@energy-web-zero/ui-localization';

describe('TopNavBar', () => {
  it('should render successfully', () => {
    const languageChangeHandlerMockFn = jest.fn();
    const navigateHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <TopNavBar
        handleLanguageChange={languageChangeHandlerMockFn}
        handleNavigate={navigateHandlerMockFn}
        primaryNavigationItemList={[]}
        secondaryNavigationItemList={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
