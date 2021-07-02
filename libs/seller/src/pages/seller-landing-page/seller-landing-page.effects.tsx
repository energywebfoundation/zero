import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { navigationStateActions } from '@energy-web-zero/store/configure';
import { useEffect } from 'react';
import { IconTypeEnum } from '@energyweb/zero-ui';

export const useSellerLandingPageEffects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      navigationStateActions.setPrimaryNavigation([
        {
          url: 'buyers',
          translateKey: 'navigation.searchOnZero',
          iconType: IconTypeEnum.SearchOutlined,
          align: 'right',
        },
        // {
        //   url: 'sellers/facilities',
        //   translateKey: 'navigation.facilities',
        //   iconType: IconTypeEnum.FlashOn,
        //   align: 'left',
        // },
        // {
        //   url: 'sellers/products',
        //   translateKey: 'navigation.products',
        //   iconType: IconTypeEnum.VerifiedUserOutlined,
        //   align: 'left',
        // },
        // {
        //   url: 'sellers/client-requests',
        //   translateKey: 'navigation.clientRequests',
        //   iconType: IconTypeEnum.PeopleOutlineOutlined,
        //   align: 'left',
        // },
      ])
    );
  }, [dispatch]);
};
