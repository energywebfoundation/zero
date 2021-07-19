import { useNavigate } from 'react-router-dom';

export const useAccountSellerDashboardPageEffects = () => {
  const navigate = useNavigate();
  return {
    handlers: {
      navigateToAddFacilitiesPageHandler: () => {
        navigate('/sellers/add-facilities');
      },
    },
  };
};
