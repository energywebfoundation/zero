// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authStateSelectors } from '@energy-web-zero/store-configure';
import { useSelector } from 'react-redux';

export const useAccountDasboardPageEffects = () => {
  return {
    selectors: {
      userProfileData: useSelector(authStateSelectors.userProfileData),
      isUserSeller: useSelector(authStateSelectors.isUserSeller),
      isUserBuyer: useSelector(authStateSelectors.isUserBuyer),
    },
  };
};
