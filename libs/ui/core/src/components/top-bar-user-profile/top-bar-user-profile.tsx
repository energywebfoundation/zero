import styled from '@emotion/styled';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { UserEntity } from '@energyweb/zero-ui-api';
import { useState, MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface TopBarUserProfileProps {
  data: UserEntity | null;
  navigateToProfileHandler: () => void;
  navigateToMyAccountHandler: () => void;
  logoutHandler: () => void;
}

const StyledTopBarUserProfile = styled.div``;

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
    <StyledTopBarUserProfile>
      <Typography
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        variant={'body1'}
      >
        {t('components.TopBarUserProfile.welcome')}, {data?.firstName}{' '}
        {data?.lastName}
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(event) => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
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
    </StyledTopBarUserProfile>
  );
};

export default TopBarUserProfile;
