import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface AuthSignupFormProps {}

const StyledAuthSignupForm = styled.div`
  color: pink;
`;

export function AuthSignupForm(props: AuthSignupFormProps) {
  return (
    <StyledAuthSignupForm>
      <h1>Welcome to AuthSignupForm!</h1>
    </StyledAuthSignupForm>
  );
}

export default AuthSignupForm;
