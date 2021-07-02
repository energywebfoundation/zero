import { useDispatch } from 'react-redux';
import { navigationStateActions } from '@energy-web-zero/store/configure';
import { useEffect } from 'react';
import { IconTypeEnum } from '@energyweb/zero-ui';

export const useBuyerLandingPageEffects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      navigationStateActions.setPrimaryNavigation([
        {
          url: 'sellers',
          translateKey: 'navigation.sellOnZero',
          iconType: IconTypeEnum.ShoppingCartOutlined,
          align: 'right',
        },
        // {
        //   url: 'buyers/searches',
        //   translateKey: 'navigation.searches',
        //   iconType: IconTypeEnum.SearchOutlined,
        //   align: 'left',
        // },
        // {
        //   url: 'buyers/product-list',
        //   translateKey: 'navigation.productList',
        //   iconType: IconTypeEnum.ListOutlined,
        //   align: 'left',
        // },
      ])
    );
  }, [dispatch]);
};
