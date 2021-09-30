import { useNavigate } from 'react-router-dom';
import { UserDto, UserRole, useUsersControllerMe } from '@energyweb/zero-api-client';

export const useAccountSellerDashboardPageEffects = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUsersControllerMe();

  const user = !!data ? data : ({} as UserDto);

  const isUserSeller = user.roles?.includes(UserRole.seller);
  const isUserBuyer = user.roles?.includes(UserRole.buyer);

  const navigateToAddFacilitiesPageHandler = () => {
    navigate('/account/dashboard/add-facilities');
  }

  return { user, isUserBuyer, isUserSeller, isLoading, navigateToAddFacilitiesPageHandler };
};
