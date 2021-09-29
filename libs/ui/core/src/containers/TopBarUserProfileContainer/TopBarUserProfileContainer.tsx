import TopBarUserProfile from '../../components/TopBarUserProfile/TopBarUserProfile';
import { useTopBarUserProfileContainerEffects } from './TopBarUserProfileContainer.effects';


export const TopBarUserProfileContainer = () => {
  const {
    selectors,
    handlers: {
      logoutHandler,
      navigateToMyAccountHandler,
      navigateToProfileHandler,
    },
  } = useTopBarUserProfileContainerEffects();
  return (
    <div>
      {selectors.isAuthenticated && (
        <TopBarUserProfile
          logoutHandler={logoutHandler}
          navigateToMyAccountHandler={navigateToMyAccountHandler}
          navigateToProfileHandler={navigateToProfileHandler}
          data={selectors.userProfileData}
        />
      )}
    </div>
  );
};

export default TopBarUserProfileContainer;
