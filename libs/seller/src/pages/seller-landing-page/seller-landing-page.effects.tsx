import { useNavigate } from 'react-router-dom';

export const useSellerLandingPageEffects = () => {
  const navigate = useNavigate();
  return { navigateToSignupPage: () => navigate('/auth/sign-up') };
};
