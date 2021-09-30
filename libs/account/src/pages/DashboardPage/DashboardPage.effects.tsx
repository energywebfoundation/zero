import { UserRole, useUsersControllerMe } from '@energyweb/zero-api-client'

export const useDasboardPageEffects = () => {
  const { data: user, isLoading } = useUsersControllerMe();

  console.log(user, isLoading);

  const isUserSeller = user?.roles?.includes(UserRole.seller);
  const isUserBuyer = user?.roles?.includes(UserRole.buyer);

  return { user, isUserBuyer, isUserSeller, isLoading };
};
