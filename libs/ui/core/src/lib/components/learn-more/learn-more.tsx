import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LearnMoreProps {}

const StyledLearnMore = styled.div`
  color: pink;
`;

export function LearnMore(props: LearnMoreProps) {
  return (
    <StyledLearnMore>
      <h1>Welcome to LearnMore!</h1>
    </StyledLearnMore>
  );
}

export default LearnMore;
