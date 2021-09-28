import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authStateSelectors } from '@energyweb/zero-ui-store';

export const useAccountSellerDashboardPageEffects = () => {
  const navigate = useNavigate();
  return {
    selectors: {
      userProfileData: useSelector(authStateSelectors.userProfileData),
      isUserSeller: useSelector(authStateSelectors.isUserSeller),
      isUserBuyer: useSelector(authStateSelectors.isUserBuyer),
    },
    handlers: {
      navigateToAddFacilitiesPageHandler: () => {
        navigate('/account/dashboard/add-facilities');
      },
    },
  };
};
