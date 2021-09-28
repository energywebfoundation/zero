import { useSelector } from 'react-redux';
import { appStateSelectors } from '@energy-web-zero/store';

export const useLayoutWithTopbarEffects = () => {
  return {
    selectors: {
      isLoading: useSelector(appStateSelectors.isLoading),
    },
  };
};
