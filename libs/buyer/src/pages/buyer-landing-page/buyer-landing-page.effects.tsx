import { useNavigate } from 'react-router-dom';

export const useBuyerLandingPageEffects = () => {
  const navigate = useNavigate();
  return { navigateToSignupPage: () => navigate('/auth/sign-up') };
};
