import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface NavigationBreadcrumbsProps {}

const StyledNavigationBreadcrumbs = styled.div`
  color: pink;
`;

export function NavigationBreadcrumbs(props: NavigationBreadcrumbsProps) {
  return (
    <StyledNavigationBreadcrumbs>
      <h1>Welcome to NavigationBreadcrumbs!</h1>
    </StyledNavigationBreadcrumbs>
  );
}

export default NavigationBreadcrumbs;
