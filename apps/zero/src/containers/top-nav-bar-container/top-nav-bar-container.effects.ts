import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  appStateActions,
  navigationStateSelectors,
} from '@energy-web-zero/store/configure';

export const useTopNavContainerEffects = () => {
  const dispatch = useDispatch();
  return {
    selectors: {
      prmiaryNavigation: useSelector(
        navigationStateSelectors.prmiaryNavigation
      ),
      secondaryNavigation: useSelector(
        navigationStateSelectors.secondaryNavigation
      ),
    },
    actions: bindActionCreators(appStateActions, dispatch),
  };
};
