import { AppBar, Box, Divider, IconButton, Toolbar } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { FC, memo, ReactElement } from 'react';
import IconLink from '../icon-link/icon-link';
import LanguageSelect, {
  AppLanguageEnum,
} from '../language-select/language-select';
import { useTopNavBarStyles } from './top-nav-bar.styles';

import PersonAddAlt1Outlined from '@material-ui/icons/PersonAddAlt1Outlined';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ListOutlined from '@material-ui/icons/ListOutlined';
import FlashOn from '@material-ui/icons/FlashOn';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import PeopleOutlineOutlined from '@material-ui/icons/PeopleOutlineOutlined';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';

export enum IconTypeEnum {
  PersonAddAlt1Outlined = 'PersonAddAlt1Outlined',
  ShoppingCartOutlined = 'ShoppingCartOutlined',
  SearchOutlined = 'SearchOutlined',
  ListOutlined = 'ListOutlined',
  FlashOn = 'FlashOn',
  PeopleOutlineOutlined = 'PeopleOutlineOutlined',
  VerifiedUserOutlined = 'VerifiedUserOutlined',
}

const getIconByIconType = (iconType: IconTypeEnum): typeof SvgIcon => {
  const iconTypesMap: { [k in IconTypeEnum]: typeof SvgIcon } = {
    [IconTypeEnum.PersonAddAlt1Outlined]: PersonAddAlt1Outlined,
    [IconTypeEnum.ShoppingCartOutlined]: ShoppingCartOutlined,
    [IconTypeEnum.SearchOutlined]: SearchOutlined,
    [IconTypeEnum.ListOutlined]: ListOutlined,
    [IconTypeEnum.FlashOn]: FlashOn,
    [IconTypeEnum.VerifiedUserOutlined]: VerifiedUserOutlined,
    [IconTypeEnum.PeopleOutlineOutlined]: PeopleOutlineOutlined,
  };

  return iconTypesMap[iconType];
};

export interface PrimaryNavigationItem {
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
}

export const TopNavBar = memo(
  ({
    sideNavToogleEnabled = false,
    primaryNavigationItemList = [],
    logo,
    handleLanguageChange,
    handleNavigate,
  }: TopNavBarProps) => {
    const styles = useTopNavBarStyles();
    return (
      <AppBar className={styles.root} color={'primary'} position="static">
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
            <IconLink
              icon={PersonAddAlt1Outlined}
              url={'register'}
              handleNavigate={handleNavigate}
              translateKey={'auth.register'}
            />

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
      </AppBar>
    );
  }
);
TopNavBar.displayName = 'TopNavBar';

interface NavLinkItemProps extends PrimaryNavigationItem {
  handleNavigate: (url: string) => void;
}

const NavLinkItem: FC<NavLinkItemProps> = ({
  translateKey,
  text,
  url,
  iconType,
  handleNavigate,
}) => (
  <Box>
    <IconLink
      key={url}
      translateKey={translateKey}
      icon={getIconByIconType(iconType)}
      url={url}
      text={text}
      handleNavigate={handleNavigate}
    />
  </Box>
);

export default TopNavBar;
