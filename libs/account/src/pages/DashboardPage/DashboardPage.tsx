import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import { SellerDashboardPage } from '../SellerDashboardPage';
import { useDasboardPageEffects } from './DashboardPage.effects';

const StyledDiv = styled.div`
  padding-top: 88px;
`;

export const DashboardPage = () => {
  const { isUserSeller, isLoading } = useDasboardPageEffects();

  if(isLoading) return <CircularProgress />

  return (
    <StyledDiv>
      {isUserSeller && <SellerDashboardPage />}
    </StyledDiv>
  );
};
