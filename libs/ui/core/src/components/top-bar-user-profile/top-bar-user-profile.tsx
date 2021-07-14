import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

/* eslint-disable-next-line */
export interface TopBarUserProfileProps {
  data: { firstName: string };
}

const StyledTopBarUserProfile = styled.div`
  color: pink;
`;

export function TopBarUserProfile({ data }: TopBarUserProfileProps) {
  return (
    <StyledTopBarUserProfile>
      <Typography variant={'body1'}>Hi {data.firstName}</Typography>
    </StyledTopBarUserProfile>
  );
}

export default TopBarUserProfile;
