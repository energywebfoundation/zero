import { useNavigate } from 'react-router-dom';

export const useBuyerLandingPageEffects = () => {
  const navigate = useNavigate();
  return {
    handlers: { navigateToSignupPageHandler: () => navigate('/auth/sign-up') },
  };
};
