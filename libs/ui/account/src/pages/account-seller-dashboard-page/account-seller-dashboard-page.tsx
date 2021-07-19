import styled from '@emotion/styled';
import { Box, Grid } from '@material-ui/core';
import FlashOn from '@material-ui/icons/FlashOn';
import { GuideCard } from '@energyweb/zero-ui';
import Edit from '@material-ui/icons/EditOutlined';
import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useAccountSellerDashboardPageEffects } from './account-seller-dashboard-page.effects';

/* eslint-disable-next-line */
export interface AccountSellerDashboardPageProps {}

const StyledAccountSellerDashboardPage = styled.div``;

export function AccountSellerDashboardPage(
  props: AccountSellerDashboardPageProps
) {
  const {
    handlers: { navigateToAddFacilitiesPageHandler },
  } = useAccountSellerDashboardPageEffects();
  return (
    <StyledAccountSellerDashboardPage>
      <Box>
        <Grid container justifyContent={'center'} columnGap={'36px'}>
          <Grid item>
            <GuideCard
              headText={'accountSellerDashboardPage.GuideCard-1.headText'}
              subHeadText={'accountSellerDashboardPage.GuideCard-1.subHeadText'}
              btnText={'accountSellerDashboardPage.GuideCard-1.btnText'}
              btnIcon={Edit}
              topIcon={FlashOn}
            />
          </Grid>
          <Grid item>
            <GuideCard
              headText={'accountSellerDashboardPage.GuideCard-2.headText'}
              subHeadText={'accountSellerDashboardPage.GuideCard-2.subHeadText'}
              btnText={'accountSellerDashboardPage.GuideCard-2.btnText'}
              btnIcon={AddOutlinedIcon}
              topIcon={WbSunnyOutlinedIcon}
            />
          </Grid>
          <Grid item>
            <GuideCard
              handleButtonClick={navigateToAddFacilitiesPageHandler}
              disabled
              headText={'accountSellerDashboardPage.GuideCard-3.headText'}
              subHeadText={'accountSellerDashboardPage.GuideCard-3.subHeadText'}
              btnText={'accountSellerDashboardPage.GuideCard-3.btnText'}
              btnIcon={ChevronRightOutlined}
              topIcon={SearchOutlinedIcon}
              disabledInfoText={
                'accountSellerDashboardPage.GuideCard-3.disabledInfoText'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </StyledAccountSellerDashboardPage>
  );
}

export default AccountSellerDashboardPage;
