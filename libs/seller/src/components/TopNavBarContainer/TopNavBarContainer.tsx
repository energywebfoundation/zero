import { Logo } from '@energyweb/zero-ui-assets';
import { TopNavBar } from '@energyweb/zero-ui-core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTopNavContainerEffects } from './TopNavBarContainer.effects';

export const TopNavBarContainer = () => {
  const {
    isAuthenticated, isLoading, primaryNavigation
  } = useTopNavContainerEffects();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return null;

  return (
    <TopNavBar
      isAuthenticated={isAuthenticated}
      hidden={location.pathname.includes('auth/')}
      // should add actual list
      secondaryNavigationItemList={[]}
      // should add actual handler
      handleNavigate={(url: string) => navigate(url)}
      // should add actual handler
      handleLanguageChange={(language: string) => console.log(language)}
      logo={<Logo width="102" height="47" />}
      primaryNavigationItemList={primaryNavigation}
    />
  );
};

export default TopNavBarContainer;
