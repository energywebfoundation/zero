import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface UiAuthProps {}

const StyledUiAuth = styled.div`
  color: pink;
`;

export function UiAuth(props: UiAuthProps) {
  return (
    <StyledUiAuth>
      <h1>Welcome to ui-auth!</h1>
    </StyledUiAuth>
  );
}

export default UiAuth;
