// import { bindActionCreators } from '@reduxjs/toolkit';
// import {
//   appStateActions,
//   authStateSelectors,
//   navigationStateActions,
//   navigationStateSelectors,
// } from '@energyweb/zero-ui-store';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { IconTypeEnum } from '../../components/NavLinkItem/NavLinkItem';
// import { UserRole, useUsersControllerMe } from '@energyweb/zero-api-client';

export const useTopNavContainerEffects = () => {
  // const location = useLocation();

  // const { data: user, isLoading } = useUsersControllerMe();
  // const isUserBuyer = user?.roles?.includes(UserRole.buyer);
  // const isUserSeller = user?.roles?.includes(UserRole.seller);
  // const isSellerPath = location.pathname.includes('/seller');
  // const isBuyerPath = location.pathname.includes('/buyer');

  // useEffect(() => {
  //   dispatch(
  //     navigationStateActions.setPrimaryNavigation([
  //       {
  //         isEnabled: isSellerPath,
  //         url: 'buyers',
  //         translateKey: 'navigation.searchOnZero',
  //         iconType: IconTypeEnum.SearchOutlined,
  //         align: 'right',
  //       },
  //       {
  //         isEnabled: isUserBuyer,
  //         url: 'buyers/searches',
  //         translateKey: 'navigation.searches',
  //         iconType: IconTypeEnum.SearchOutlined,
  //         align: 'left',
  //       },
  //       {
  //         isEnabled: isUserBuyer,
  //         url: 'buyers/product-list',
  //         translateKey: 'navigation.productList',
  //         iconType: IconTypeEnum.ListOutlined,
  //         align: 'left',
  //       },

  //       // Sellers
  //       {
  //         isEnabled: isBuyerPath,
  //         url: 'sellers',
  //         translateKey: 'navigation.sellOnZero',
  //         iconType: IconTypeEnum.ShoppingCartOutlined,
  //         align: 'right',
  //       },
  //       {
  //         isEnabled: isUserSeller,
  //         url: 'sellers/facilities',
  //         translateKey: 'navigation.facilities',
  //         iconType: IconTypeEnum.FlashOn,
  //         align: 'left',
  //       },
  //       {
  //         isEnabled: isUserSeller,
  //         url: 'sellers/products',
  //         translateKey: 'navigation.products',
  //         iconType: IconTypeEnum.VerifiedUserOutlined,
  //         align: 'left',
  //       },
  //       {
  //         isEnabled: isUserSeller,
  //         url: 'sellers/client-requests',
  //         translateKey: 'navigation.clientRequests',
  //         iconType: IconTypeEnum.PeopleOutlineOutlined,
  //         align: 'left',
  //       },
  //     ])
  //   );
  // }, [location]);

  return {
    // selectors: {
    //   primiaryNavigation: useSelector(
    //     navigationStateSelectors.primiaryNavigation
    //   ),
    //   secondaryNavigation: useSelector(
    //     navigationStateSelectors.secondaryNavigation
    //   ),
    //   isAuthenticated: useSelector(authStateSelectors.isAuthenticated),
    // },
    // actions: bindActionCreators(appStateActions, dispatch),
  };
};
