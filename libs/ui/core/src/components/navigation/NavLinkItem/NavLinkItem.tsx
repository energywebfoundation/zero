import styled from '@emotion/styled';
import { FC, memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import PersonAddAlt1Outlined from '@material-ui/icons/PersonAddAlt1Outlined';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ListOutlined from '@material-ui/icons/ListOutlined';
import FlashOn from '@material-ui/icons/FlashOn';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import PeopleOutlineOutlined from '@material-ui/icons/PeopleOutlineOutlined';
import { IconLink } from '../../layout';

export enum IconTypeEnum {
  PersonAddAlt1Outlined = 'PersonAddAlt1Outlined',
  ShoppingCartOutlined = 'ShoppingCartOutlined',
  SearchOutlined = 'SearchOutlined',
  ListOutlined = 'ListOutlined',
  FlashOn = 'FlashOn',
  PeopleOutlineOutlined = 'PeopleOutlineOutlined',
  VerifiedUserOutlined = 'VerifiedUserOutlined',
}

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

const StyledDiv = styled.div`
  margin-right: 20px;
`;

interface NavLinkItemProps extends PrimaryNavigationItem {
  handleNavigate: (url: string) => void;
}

export const NavLinkItem: FC<NavLinkItemProps> = memo(
  ({ translateKey, text, url, iconType, handleNavigate }) => (
    <StyledDiv>
      <IconLink
        key={url}
        translateKey={translateKey}
        icon={getIconByIconType(iconType)}
        url={url}
        text={text}
        handleNavigate={handleNavigate}
      />
    </StyledDiv>
  )
);

NavLinkItem.displayName = 'NavLinkItem';