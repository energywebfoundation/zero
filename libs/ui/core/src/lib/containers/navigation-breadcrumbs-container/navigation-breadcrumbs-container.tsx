import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface NavigationBreadcrumbsContainerProps {}

const StyledNavigationBreadcrumbsContainer = styled.div`
  color: pink;
`;

export function NavigationBreadcrumbsContainer(
  props: NavigationBreadcrumbsContainerProps
) {
  return (
    <StyledNavigationBreadcrumbsContainer>
      <h1>Welcome to NavigationBreadcrumbsContainer!</h1>
    </StyledNavigationBreadcrumbsContainer>
  );
}

export default NavigationBreadcrumbsContainer;
