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
import IconLink from '../icon-link/icon-link';
import LanguageSelect, {
  AppLanguageEnum,
} from '../language-select/language-select';
import { useTopNavBarStyles } from './top-nav-bar.styles';

import PersonAddAlt1Outlined from '@material-ui/icons/PersonAddAlt1Outlined';
import NavLinkItem, { IconTypeEnum } from '../nav-link-item/nav-link-item';
import { PersonOutline } from '@material-ui/icons';
import NotificationAreaContainer from '../../../containers/notification-area-container/notification-area-container';
import TopBarUserProfileContainer from '../../../containers/top-bar-user-profile-container/top-bar-user-profile-container';

export interface PrimaryNavigationItem {
  isEnabled: boolean;
  url: string;
  text?: string;
  iconType: IconTypeEnum;
  translateKey?: string;
  prority?: number;
  align: 'left' | 'right';
}

export interface SecondaryNavigationItem {
  url: string;
  text?: string;
  translateKey?: string;
}

/* eslint-disable-next-line */
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
          display: hidden ? 'none' : 'unset',
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
              {logo ?? <Box>{logo}</Box>}
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
                <TopBarUserProfileContainer />
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
          <NotificationAreaContainer />
        </Container>
      </AppBar>
    );
  }
);
TopNavBar.displayName = 'TopNavBar';

export default TopNavBar;

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
