import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface AuthLogoutPageProps {}

const StyledAuthLogoutPage = styled.div`
  color: pink;
`;

export function AuthLogoutPage(props: AuthLogoutPageProps) {
  return (
    <StyledAuthLogoutPage>
      <h1>Welcome to AuthLogoutPage!</h1>
    </StyledAuthLogoutPage>
  );
}

export default AuthLogoutPage;
