import { TopNavBar } from '@energyweb/zero-ui-core';
import { Logo } from '@energyweb/zero-ui-assets';
import { useTopNavContainerEffects } from './top-nav-bar-container.effects';
import { useLocation, useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface TopNavBarContainerProps {}

export const TopNavBarContainer = () => {
  const {
    selectors: { isAuthenticated, primiaryNavigation, secondaryNavigation },
    actions: { changeLanguage },
  } = useTopNavContainerEffects();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <TopNavBar
      isAuthenticated={isAuthenticated}
      hidden={location.pathname.includes('auth/')}
      secondaryNavigationItemList={secondaryNavigation}
      handleNavigate={(url) => navigate(url)}
      handleLanguageChange={(language) => changeLanguage(language)}
      logo={<Logo width="102" height="47" />}
      primaryNavigationItemList={primiaryNavigation}
    />
  );
};

export default TopNavBarContainer;
