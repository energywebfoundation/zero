import { Avatar, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export interface TopBarUserProfileProps {
  // should be either generic or moved out of core lib (prev userDto)
  user: any;
  navigateToProfileHandler: () => void;
  navigateToMyAccountHandler: () => void;
  logoutHandler: () => void;
}

export const TopBarUserProfile = (props: TopBarUserProfileProps) => {
  const {
    navigateToProfileHandler,
    navigateToMyAccountHandler,
    logoutHandler,
    user,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { t } = useTranslation();
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Avatar sx={{ width: '51px', height: '51px' }} />
      <Typography
        ml={1}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        variant={'body1'}
        // should remove hardcoded colors
        color={'#fff'}
      >
        {/* should remove localization out */}
        {t('components.TopBarUserProfile.welcome')},{' '}
        <Box color={'secondary.main'} fontWeight={700} component={'span'}>
          {user?.firstName} {user?.lastName}
        </Box>
      </Typography>
      <Menu
        disableAutoFocusItem={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(event) => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigateToProfileHandler();
          }}
        >
          {t('components.TopBarUserProfile.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigateToMyAccountHandler();
            setAnchorEl(null);
          }}
        >
          {t('components.TopBarUserProfile.myAccount')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            logoutHandler();
            setAnchorEl(null);
          }}
        >
          {t('components.TopBarUserProfile.logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
};
