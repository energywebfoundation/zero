import { UserRole, useUsersControllerMe } from '@energyweb/zero-api-client';
import { IconTypeEnum } from '@energyweb/zero-ui-core';

export const useTopNavContainerEffects = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const { data: user, isLoading } = useUsersControllerMe();
  const isUserBuyer = user ? user.roles?.includes(UserRole.buyer) : false;
  const isUserSeller = user ? user.roles?.includes(UserRole.seller) : false;
  const isSellerPath = location.pathname.includes('/seller');
  const isBuyerPath = location.pathname.includes('/buyer');

  console.log(user);

  const primaryNavigation = [
          {
            isEnabled: isSellerPath,
            url: 'buyers',
            translateKey: 'navigation.searchOnZero',
            iconType: IconTypeEnum.SearchOutlined,
            align: "right" as any,
          },
          {
            isEnabled: isUserBuyer,
            url: 'buyers/searches',
            translateKey: 'navigation.searches',
            iconType: IconTypeEnum.SearchOutlined,
            align: "left" as any,
          },
          {
            isEnabled: isUserBuyer,
            url: 'buyers/product-list',
            translateKey: 'navigation.productList',
            iconType: IconTypeEnum.ListOutlined,
            align: "left" as any,
          },

          // Sellers
          {
            isEnabled: isBuyerPath,
            url: 'sellers',
            translateKey: 'navigation.sellOnZero',
            iconType: IconTypeEnum.ShoppingCartOutlined,
            align: "right" as any,
          },
          {
            isEnabled: isUserSeller,
            url: 'sellers/facilities',
            translateKey: 'navigation.facilities',
            iconType: IconTypeEnum.FlashOn,
            align: "left" as any,
          },
          {
            isEnabled: isUserSeller,
            url: 'sellers/products',
            translateKey: 'navigation.products',
            iconType: IconTypeEnum.VerifiedUserOutlined,
            align: "left" as any,
          },
          {
            isEnabled: isUserSeller,
            url: 'sellers/client-requests',
            translateKey: 'navigation.clientRequests',
            iconType: IconTypeEnum.PeopleOutlineOutlined,
            align: "left" as any,
          },
        ]

  return {
    isAuthenticated, isLoading, primaryNavigation
  };
};
