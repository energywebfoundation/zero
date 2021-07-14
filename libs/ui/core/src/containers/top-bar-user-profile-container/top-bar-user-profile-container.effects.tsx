import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authStateSelectors } from '@energy-web-zero/store-configure';

export const useTopBarUserProfileContainerEffects = () => {
  return {
    selectors: {
      userProfileData: useSelector(authStateSelectors.userProfileData),
    },
  };
};
