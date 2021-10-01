import { Logo } from '@energyweb/zero-ui-assets';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
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
      secondaryNavigationItemList={[]}
      handleNavigate={(url: string) => navigate(url)}
      handleLanguageChange={(language: string) => console.log(language)}
      logo={<Logo width="102" height="47" />}
      primaryNavigationItemList={primaryNavigation}
    />
  );
};

export default TopNavBarContainer;
