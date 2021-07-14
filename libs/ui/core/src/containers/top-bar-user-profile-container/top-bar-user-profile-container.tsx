import styled from '@emotion/styled';
import TopBarUserProfile from '../../components/top-bar-user-profile/top-bar-user-profile';
import { useTopBarUserProfileContainerEffects } from './top-bar-user-profile-container.effects';

/* eslint-disable-next-line */
export interface TopBarUserProfileContainerProps {}

const StyledTopBarUserProfileContainer = styled.div``;

export function TopBarUserProfileContainer() {
  const { selectors } = useTopBarUserProfileContainerEffects();
  return (
    <StyledTopBarUserProfileContainer>
      {/*<TopBarUserProfile data={selectors.userProfileData} />*/}
    </StyledTopBarUserProfileContainer>
  );
}

export default TopBarUserProfileContainer;