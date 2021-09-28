import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  appStateActions,
  authStateSelectors,
  navigationStateActions,
  navigationStateSelectors,
} from '@energyweb/zero-ui-store';
import { useEffect } from 'react';
import { IconTypeEnum } from '@energyweb/zero-ui';
import { useLocation } from 'react-router-dom';

export const useTopNavContainerEffects = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserBuyer = useSelector(authStateSelectors.isUserBuyer);
  const isUserSeller = useSelector(authStateSelectors.isUserSeller);
  const isSellerPath = location.pathname.includes('/seller');
  const isBuyerPath = location.pathname.includes('/buyer');
  useEffect(() => {
    dispatch(
      navigationStateActions.setPrimaryNavigation([
        {
          isEnabled: isSellerPath,
          url: 'buyers',
          translateKey: 'navigation.searchOnZero',
          iconType: IconTypeEnum.SearchOutlined,
          align: 'right',
        },
        {
          isEnabled: isUserBuyer,
          url: 'buyers/searches',
          translateKey: 'navigation.searches',
          iconType: IconTypeEnum.SearchOutlined,
          align: 'left',
        },
        {
          isEnabled: isUserBuyer,
          url: 'buyers/product-list',
          translateKey: 'navigation.productList',
          iconType: IconTypeEnum.ListOutlined,
          align: 'left',
        },

        // Sellers
        {
          isEnabled: isBuyerPath,
          url: 'sellers',
          translateKey: 'navigation.sellOnZero',
          iconType: IconTypeEnum.ShoppingCartOutlined,
          align: 'right',
        },
        {
          isEnabled: isUserSeller,
          url: 'sellers/facilities',
          translateKey: 'navigation.facilities',
          iconType: IconTypeEnum.FlashOn,
          align: 'left',
        },
        {
          isEnabled: isUserSeller,
          url: 'sellers/products',
          translateKey: 'navigation.products',
          iconType: IconTypeEnum.VerifiedUserOutlined,
          align: 'left',
        },
        {
          isEnabled: isUserSeller,
          url: 'sellers/client-requests',
          translateKey: 'navigation.clientRequests',
          iconType: IconTypeEnum.PeopleOutlineOutlined,
          align: 'left',
        },
      ])
    );
  }, [location, dispatch]);

  return {
    selectors: {
      primiaryNavigation: useSelector(
        navigationStateSelectors.primiaryNavigation
      ),
      secondaryNavigation: useSelector(
        navigationStateSelectors.secondaryNavigation
      ),
      isAuthenticated: useSelector(authStateSelectors.isAuthenticated),
    },
    actions: bindActionCreators(appStateActions, dispatch),
  };
};
