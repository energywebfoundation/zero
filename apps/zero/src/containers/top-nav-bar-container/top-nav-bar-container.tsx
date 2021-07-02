import { TopNavBar } from '@energyweb/zero-ui';
import { Logo } from '@energy-web-zero/zero-ui-assets';
import { useTopNavContainerEffects } from './top-nav-bar-container.effects';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface TopNavBarContainerProps {}

export const TopNavBarContainer = (props: TopNavBarContainerProps) => {
  const {
    selectors: { prmiaryNavigation, secondaryNavigation },
    actions: { changeLanguage },
  } = useTopNavContainerEffects();
  const navigate = useNavigate();
  return (
    <TopNavBar
      secondaryNavigationItemList={secondaryNavigation}
      handleNavigate={(url) => {
        navigate(url);
      }}
      handleLanguageChange={(language) => changeLanguage(language)}
      logo={<Logo />}
      primaryNavigationItemList={prmiaryNavigation}
    />
  );
};

export default TopNavBarContainer;
