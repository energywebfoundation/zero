import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface AccountBuyerDashboardPageProps {}

const StyledAccountBuyerDashboardPage = styled.div`
  color: pink;
`;

export function AccountBuyerDashboardPage(
  props: AccountBuyerDashboardPageProps
) {
  return (
    <StyledAccountBuyerDashboardPage>
      <h1>Welcome to AccountBuyerDashboardPage!</h1>
    </StyledAccountBuyerDashboardPage>
  );
}

export default AccountBuyerDashboardPage;
