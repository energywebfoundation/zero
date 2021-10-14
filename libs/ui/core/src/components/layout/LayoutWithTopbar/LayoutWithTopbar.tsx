import { Logo } from '@energyweb/zero-ui-assets';
import { Container } from '@material-ui/core';
import { ReactNode, ReactNodeArray } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryNavigationItem, TopNavBar } from '../../navigation';
import { IUserTopBar } from '../TopBarUserProfile';

export interface LayoutWithTopbarProps {
  children: ReactNode | ReactNodeArray;
  isAuthenticated: boolean;
  primaryNavigation: PrimaryNavigationItem[];
  user: IUserTopBar;
  navigateToProfileHandler: () => void;
  navigateToMyAccountHandler: () => void;
  logoutHandler: () => void;
}

export const LayoutWithTopbar = ({
  children,
  isAuthenticated,
  primaryNavigation,
  user,
  logoutHandler,
  navigateToMyAccountHandler,
  navigateToProfileHandler
}: LayoutWithTopbarProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavBar
        isAuthenticated={isAuthenticated}
        handleNavigate={(url: string) => navigate(url)}
        logo={<Logo width="102" height="47" />}
        primaryNavigationItemList={primaryNavigation.filter(el => el.isEnabled)}
        user={user}
        logoutHandler={logoutHandler}
        navigateToMyAccountHandler={navigateToMyAccountHandler}
        navigateToProfileHandler={navigateToProfileHandler}
        // should add actual handler
        handleLanguageChange={(language: string) => console.log(language)}
        // should add actual list / or remove ??
        secondaryNavigationItemList={[]}
      />
      <Container fixed sx={{ pt: '98px' }}>
        {children}
      </Container>
    </>
  );
};
