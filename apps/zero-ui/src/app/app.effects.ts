
import { useAxiosInterceptors, UserDto, UserRole, useUsersControllerMe } from '@energyweb/zero-api-client';
import { IconTypeEnum } from '@energyweb/zero-ui-core';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAppEffects = () => {
  useAxiosInterceptors();
  const authToken = localStorage.getItem('token');
  const isAuthenticated = Boolean(authToken);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, data } = useUsersControllerMe({
    query: {
      enabled: isAuthenticated,
    },
  });

  const user = data ?? ({} as UserDto);

  const isUserBuyer = user ? user.roles?.includes(UserRole.buyer) : false;
  const isUserSeller = user ? user.roles?.includes(UserRole.seller) : false;
  const isSellerPath = location.pathname.includes('/seller');
  const isBuyerPath = location.pathname.includes('/buyer');

  const primaryNavigation = [
    {
      isEnabled: isSellerPath,
      url: '/buyers',
      translateKey: 'navigation.searchOnZero',
      iconType: IconTypeEnum.SearchOutlined,
      align: "right" as any,
    },
    {
      isEnabled: isUserBuyer,
      url: '/buyers/searches',
      translateKey: 'navigation.searches',
      iconType: IconTypeEnum.SearchOutlined,
      align: "left" as any,
    },
    {
      isEnabled: isUserBuyer,
      url: '/buyers/product-list',
      translateKey: 'navigation.productList',
      iconType: IconTypeEnum.ListOutlined,
      align: "left" as any,
    },

    // Sellers
    {
      isEnabled: isBuyerPath,
      url: '/sellers',
      translateKey: 'navigation.sellOnZero',
      iconType: IconTypeEnum.ShoppingCartOutlined,
      align: "right" as any,
    },
    {
      isEnabled: isUserSeller,
      url: '/sellers/facilities',
      translateKey: 'navigation.facilities',
      iconType: IconTypeEnum.FlashOn,
      align: "left" as any,
    },
    {
      isEnabled: isUserSeller,
      url: '/sellers/products',
      translateKey: 'navigation.products',
      iconType: IconTypeEnum.VerifiedUserOutlined,
      align: "left" as any,
    },
    {
      isEnabled: isUserSeller,
      url: '/sellers/client-requests',
      translateKey: 'navigation.clientRequests',
      iconType: IconTypeEnum.PeopleOutlineOutlined,
      align: "left" as any,
    },
  ];

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token')
    navigate('/');
  }, []);

  const navigateToMyAccountHandler = useCallback(() => {
    navigate('/account/dashboard');
  }, []);

  const navigateToProfileHandler = useCallback(() => {
    console.log('navigate to profile')
  }, [])

  return {
    isLoading,
    isAuthenticated,
    user,
    primaryNavigation,
    logoutHandler,
    navigateToMyAccountHandler,
    navigateToProfileHandler
  };
};
