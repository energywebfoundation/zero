import { useSelector } from 'react-redux';
import { appStateSelectors } from '@energy-web-zero/store-configure';

export const useLayoutWithTopbarEffects = () => {
  return {
    selectors: {
      isLoading: useSelector(appStateSelectors.isLoading),
    },
  };
};
