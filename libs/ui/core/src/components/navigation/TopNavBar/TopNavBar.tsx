import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import { FC, memo, ReactElement } from 'react';
import { NotificationAreaContainer } from '../../../containers';
import { IconLink } from '../../layout';
import { AppLanguageEnum, LanguageSelect } from '../../layout/LanguageSelect';
import { NavLinkItem, PrimaryNavigationItem, SecondaryNavigationItem } from '../NavLinkItem';
import { useTopNavBarStyles } from './TopNavBar.styles';

export interface TopNavBarProps {
  logo?: ReactElement;
  sideNavToogleEnabled?: boolean;
  primaryNavigationItemList: PrimaryNavigationItem[];
  secondaryNavigationItemList: SecondaryNavigationItem[];
  handleLanguageChange: (language: AppLanguageEnum) => void;
  handleNavigate: (url: string) => void;
  hidden?: boolean;
  isAuthenticated: boolean;
}

// should be as a separate component
const AuthLinksSection: FC<{
  isAuthenticated: boolean;
  handleNavigate: (url: string) => void;
}> = ({ isAuthenticated, handleNavigate }) => {
  return !isAuthenticated ? (
    <IconLink
      icon={PersonOutline}
      url={'auth/sign-in'}
      handleNavigate={handleNavigate}
      translateKey={'auth.signIn'}
    />
  ) : null;
};

// should remove hard coded colors
export const TopNavBar = memo(
  ({
    sideNavToogleEnabled = false,
    primaryNavigationItemList = [],
    logo,
    handleLanguageChange,
    handleNavigate,
    hidden,
    isAuthenticated,
  }: TopNavBarProps) => {
    const styles = useTopNavBarStyles();

    return (
      <AppBar
        style={{
          display: hidden ? 'none' : 'inherit',
          position: 'fixed',
          zIndex: 1000,
        }}
        hidden={hidden}
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
                {/* should not be used here */}
                {/* <TopBarUserProfileContainer /> */}
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

