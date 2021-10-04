import { useNavigate } from 'react-router-dom';

export const useSellerLandingPageEffects = () => {
  const navigate = useNavigate();
  return {
    handlers: {
      navigateToSignupPageHandler: () => navigate('/auth/sign-up'),
    },
  };
};
