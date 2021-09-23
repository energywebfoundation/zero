import styled from '@emotion/styled';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { GuideCard } from '@energyweb/zero-ui';
import Edit from '@material-ui/icons/EditOutlined';
import FlashOn from '@material-ui/icons/FlashOn';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { UserDto } from '@energyweb/zero-ui-api';

/* eslint-disable-next-line */
export interface AccountSellerDashboardEmptyPageProps {
  navigateToAddFacilitiesPageHandler: () => void;
  userProfileData: UserDto | null;
}

const StyledAccountSellerDashboardEmptyPage = styled.div``;

export const AccountSellerDashboardEmptyPage = ({
  userProfileData,
  navigateToAddFacilitiesPageHandler,
}: AccountSellerDashboardEmptyPageProps) => (
  <StyledAccountSellerDashboardEmptyPage>
    <Typography
      fontSize={'24px'}
      variant={'h6'}
      fontWeight={600}
      textAlign={'center'}
      color={'primary'}
    >
      Welcome to Zero, {userProfileData?.firstName}
    </Typography>
    <Typography
      mb={'80px'}
      fontWeight={700}
      textAlign={'center'}
      fontSize={'32px'}
      color={'primary'}
      variant={'h5'}
    >
      Here are your
      <Box
        component={'span'}
        sx={{ color: (theme) => theme.palette.secondary.main }}
      >
        {' '}
        next steps
      </Box>
    </Typography>
    <Box>
      <Grid container justifyContent={'center'} columnGap={'36px'}>
        <Grid item>
          <GuideCard
            headText={'accountSellerDashboardEmptyPage.GuideCard-1.headText'}
            subHeadText={
              'accountSellerDashboardEmptyPage.GuideCard-1.subHeadText'
            }
            btnText={'accountSellerDashboardEmptyPage.GuideCard-1.btnText'}
            btnIcon={Edit}
            topIcon={FlashOn}
          />
        </Grid>
        <Grid item>
          <GuideCard
            handleButtonClick={navigateToAddFacilitiesPageHandler}
            headText={'accountSellerDashboardEmptyPage.GuideCard-2.headText'}
            subHeadText={
              'accountSellerDashboardEmptyPage.GuideCard-2.subHeadText'
            }
            btnText={'accountSellerDashboardEmptyPage.GuideCard-2.btnText'}
            btnIcon={AddOutlinedIcon}
            topIcon={WbSunnyOutlinedIcon}
          />
        </Grid>
        <Grid item>
          <GuideCard
            disabled
            headText={'accountSellerDashboardEmptyPage.GuideCard-3.headText'}
            subHeadText={
              'accountSellerDashboardEmptyPage.GuideCard-3.subHeadText'
            }
            btnText={'accountSellerDashboardEmptyPage.GuideCard-3.btnText'}
            btnIcon={ChevronRightOutlined}
            topIcon={SearchOutlinedIcon}
            disabledInfoText={
              'accountSellerDashboardEmptyPage.GuideCard-3.disabledInfoText'
            }
          />
        </Grid>
      </Grid>
    </Box>
  </StyledAccountSellerDashboardEmptyPage>
);

export default AccountSellerDashboardEmptyPage;
