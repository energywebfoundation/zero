import { TopBarUserProfile } from '@energyweb/zero-ui-core';
import { useTopBarUserProfileContainerEffects } from './TopBarUserProfileContainer.effects';

export const TopBarUserProfileContainer = () => {
  const {
    userProfileData,
    isAuthenticated,
    isLoading,
    handlers: {
      logoutHandler,
      navigateToMyAccountHandler,
      navigateToProfileHandler,
    },
  } = useTopBarUserProfileContainerEffects();

  if(isLoading) return null;

  return (
    <div>
      {isAuthenticated && (
        <TopBarUserProfile
          logoutHandler={logoutHandler}
          navigateToMyAccountHandler={navigateToMyAccountHandler}
          navigateToProfileHandler={navigateToProfileHandler}
          user={userProfileData}
        />
      )}
    </div>
  );
};

export default TopBarUserProfileContainer;
