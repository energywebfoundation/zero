import { render } from '@testing-library/react';

import NavLinkItem, { IconTypeEnum } from './NavLinkItem';

describe('NavLinkItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <NavLinkItem
      isEnabled
      url="/home"
      iconType={IconTypeEnum.FlashOn}
      align="left"
      handleNavigate={() => console.log('navigate')}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
