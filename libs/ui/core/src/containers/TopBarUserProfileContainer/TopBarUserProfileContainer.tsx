import TopBarUserProfile from '../../components/TopBarUserProfile/TopBarUserProfile';
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
          data={userProfileData}
        />
      )}
    </div>
  );
};

export default TopBarUserProfileContainer;
