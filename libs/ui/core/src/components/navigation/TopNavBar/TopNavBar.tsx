import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { FC, memo, ReactElement } from 'react';
import { NotificationAreaContainer } from '../../../containers';
import { AppLanguageEnum, IUserTopBar, LanguageSelect, TopBarUserProfile } from '../../layout';
import { AuthLinksSection } from '../AuthLinksSection';
import { NavLinkItem, PrimaryNavigationItem, SecondaryNavigationItem } from '../NavLinkItem';
import { useTopNavBarStyles } from './TopNavBar.styles';

export interface TopNavBarProps {
  logo?: ReactElement;
  sideNavToogleEnabled?: boolean;
  primaryNavigationItemList: PrimaryNavigationItem[];
  secondaryNavigationItemList: SecondaryNavigationItem[];
  handleLanguageChange: (language: AppLanguageEnum) => void;
  handleNavigate: (url: string) => void;
  isAuthenticated: boolean;
  user: IUserTopBar;
  navigateToProfileHandler: () => void;
  navigateToMyAccountHandler: () => void;
  logoutHandler: () => void;
}

export const TopNavBar: FC<TopNavBarProps> = memo(
  ({
    sideNavToogleEnabled = false,
    primaryNavigationItemList = [],
    logo,
    handleLanguageChange,
    handleNavigate,
    isAuthenticated,
    user,
    logoutHandler,
    navigateToProfileHandler,
    navigateToMyAccountHandler
  }) => {
    const styles = useTopNavBarStyles();

    return (
      <AppBar
        style={{
          position: 'fixed',
          zIndex: 1000,
        }}
        className={styles.root}
        position="static"
      >
        <Container fixed>
          <Toolbar disableGutters>
            <Box>
              {sideNavToogleEnabled && (
                <IconButton color="secondary" aria-label="menu" sx={{ mr: 2 }}>
                  <Menu />
                </IconButton>
              )}
              {logo ?? (
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    handleNavigate(
                      isAuthenticated
                        ? '/account/dashboard'
                        : '/auth/sign-up'
                    )
                  }
                >
                  {logo}
                </Box>
              )}
            </Box>
            <Box
              flexGrow={1}
              mx={'45px'}
              justifyItems={'space-between'}
              display={'flex'}
            >
              <Box flexGrow={1} display={'flex'}>
                {primaryNavigationItemList
                  .filter((el) => el.align === 'left')
                  .map((navLinkItem) => (
                    <NavLinkItem
                      {...navLinkItem}
                      key={navLinkItem.url}
                      handleNavigate={handleNavigate}
                    />
                  ))}
              </Box>
              <Box justifyContent={'flex-end'} display={'flex'}>
                {primaryNavigationItemList
                  .filter((el) => el.align === 'right')
                  .map((navLinkItem) => (
                    <NavLinkItem
                      {...navLinkItem}
                      key={navLinkItem.url}
                      handleNavigate={handleNavigate}
                    />
                  ))}
              </Box>
            </Box>
            <Box
              alignItems={'center'}
              justifyContent={'flex-end'}
              display={'flex'}
              textAlign={'end'}
            >
              <Box mr={'45px'}>
                <Divider
                  sx={{ height: 48 }}
                  orientation={'vertical'}
                  flexItem
                  color={'#9B95BD'}
                />
              </Box>
              <Box>
                <AuthLinksSection
                  isAuthenticated={isAuthenticated}
                  handleNavigate={handleNavigate}
                />
                {isAuthenticated && (
                  <TopBarUserProfile
                    logoutHandler={logoutHandler}
                    navigateToMyAccountHandler={navigateToMyAccountHandler}
                    navigateToProfileHandler={navigateToProfileHandler}
                    user={user}
                  />
                )}
              </Box>
              <Box
                alignItems={'center'}
                height={'100%'}
                ml={'40px'}
                minWidth={'50px'}
                justifyContent={'flex-end'}
              >
                <LanguageSelect handleLanguageChange={handleLanguageChange} />
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <NotificationAreaContainer />
      </AppBar>
    );
  }
);

TopNavBar.displayName = 'TopNavBar';

