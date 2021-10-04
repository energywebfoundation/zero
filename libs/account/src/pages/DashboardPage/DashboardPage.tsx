import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { SellerDashboardPage } from '../SellerDashboardPage';
import { useDasboardPageEffects } from './DashboardPage.effects';

const StyledDiv = styled.div`
  padding-top: 88px;
`;

export const DashboardPage = () => {
  const { isUserSeller, isLoading } = useDasboardPageEffects();

  if (isLoading) return <CircularProgress />

  return (
    <StyledDiv>
      <Helmet>
        <title>Account / Dashboard</title>
      </Helmet>
      {isUserSeller && <SellerDashboardPage />}
    </StyledDiv>
  );
};
