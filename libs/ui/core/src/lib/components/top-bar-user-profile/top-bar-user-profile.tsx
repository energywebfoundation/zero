import styled from '@emotion/styled';
import { Avatar, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import { UserDto } from '@energy-web-zero/api-client';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface TopBarUserProfileProps {
  data: UserDto | null;
  navigateToProfileHandler: () => void;
  navigateToMyAccountHandler: () => void;
  logoutHandler: () => void;
}

const StyledTopBarUserProfileBox = styled(Box)``;

export const TopBarUserProfile = (props: TopBarUserProfileProps) => {
  const {
    navigateToProfileHandler,
    navigateToMyAccountHandler,
    logoutHandler,
    data,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { t } = useTranslation();
  return (
    <StyledTopBarUserProfileBox display={'flex'} alignItems={'center'}>
      <Avatar sx={{ width: '51px', height: '51px' }} />
      <Typography
        ml={1}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        variant={'body1'}
        color={'#fff'}
      >
        {t('components.TopBarUserProfile.welcome')},{' '}
        <Box color={'secondary.main'} fontWeight={700} component={'span'}>
          {data?.firstName} {data?.lastName}
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
    </StyledTopBarUserProfileBox>
  );
};

export default TopBarUserProfile;
