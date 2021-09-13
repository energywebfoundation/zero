import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface GenericModalContainerProps {}

const StyledGenericModalContainer = styled.div`
  color: pink;
`;

export function GenericModalContainer(props: GenericModalContainerProps) {
  return (
    <StyledGenericModalContainer>
      <h1>Welcome to GenericModalContainer!</h1>
    </StyledGenericModalContainer>
  );
}

export default GenericModalContainer;
