import { useSelector } from 'react-redux';
import { appStateSelectors } from '@energyweb/zero-ui-store';

export const useLayoutWithTopbarEffects = () => {
  return {
    selectors: {
      isLoading: useSelector(appStateSelectors.isLoading),
    },
  };
};
