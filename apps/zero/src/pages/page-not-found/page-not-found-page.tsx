import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PageNotFoundPageProps {}

const StyledPageNotFoundPage = styled.div``;

export const PageNotFoundPage = (props: PageNotFoundPageProps) => (
  <StyledPageNotFoundPage>
    <h1>Welcome to PageNotFoundPage!</h1>
  </StyledPageNotFoundPage>
);

export default PageNotFoundPage;
