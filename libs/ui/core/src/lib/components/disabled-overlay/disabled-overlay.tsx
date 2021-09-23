import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DisabledOverlayProps {}

const StyledDisabledOverlay = styled.div`
  color: pink;
`;

export function DisabledOverlay(props: DisabledOverlayProps) {
  return (
    <StyledDisabledOverlay>
      <h1>Welcome to DisabledOverlay!</h1>
    </StyledDisabledOverlay>
  );
}

export default DisabledOverlay;
