import styled from '@emotion/styled';
import { FC, memo } from 'react';
import { ReactComponent as NotFoundSvg } from './not_found.svg';
import { Helmet } from 'react-helmet-async';
import { Logo } from '@energyweb/zero-ui-assets';
import { Box, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import LayoutNoTopbar from '../../layouts/layout-no-topbar/layout-no-topbar';

/* eslint-disable-next-line */
export interface NotFoundPageProps {
  isAuthenticated: boolean;
  nonAuthenticatedHomeRoute: string;
  authenticatedHomeRoute: string;
}

const StyledNotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 88px);
  align-items: center;
`;

export const NotFoundPage: FC<NotFoundPageProps> = memo(
  ({ isAuthenticated, authenticatedHomeRoute, nonAuthenticatedHomeRoute }) => {
    const { t } = useTranslation();
    return (
      <LayoutNoTopbar>
        <StyledNotFoundPage>
          <Helmet>
            <title>{t('pages.NotFoundPage.title')}</title>
          </Helmet>
          <Grid container>
            <Grid item xs={12} textAlign={'center'}>
              <Logo style={{ transform: 'scale(1.3)' }} />
              <Typography
                fontWeight={700}
                color={'#fff'}
                fontSize={'32px'}
                lineHeight={'41px'}
                mt={10}
              >
                {t('pages.NotFoundPage.whoops')}
              </Typography>
              <Link
                to={
                  isAuthenticated
                    ? authenticatedHomeRoute
                    : nonAuthenticatedHomeRoute
                }
                style={{ textDecoration: 'none' }}
              >
                <Box
                  fontFamily={'Rajdhani'}
                  fontWeight={700}
                  fontSize={'32px'}
                  justifyContent={'center'}
                  component={'span'}
                  color={'#00D08A'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <ChevronLeft />
                  {t('pages.NotFoundPage.back')}
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Box mt={7}>
                <NotFoundSvg />
              </Box>
            </Grid>
          </Grid>
        </StyledNotFoundPage>
      </LayoutNoTopbar>
    );
  }
);

export default NotFoundPage;
