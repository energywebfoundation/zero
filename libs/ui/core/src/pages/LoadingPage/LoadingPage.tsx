import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, Typography } from '@material-ui/core';
import { FC, memo, ReactNode } from 'react';
import { Logo } from '@energyweb/zero-ui-assets';
import { useTranslation } from 'react-i18next';
import { ReactComponent as WindMillSvg } from './windmill.svg';

export interface LoadingPageProps {
  isLoading: boolean;
  children: ReactNode;
}

const StyledLoadingPage = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh);
  align-items: center;
  flex-wrap: wrap;
  background-color: #2d1155;
  width: 100vw;
`;

export const LoadingPage: FC<LoadingPageProps> = memo(
  ({ children, isLoading }) => {
    const { t } = useTranslation();
    return (
      <>
        <div
          style={{
            display: isLoading ? 'block' : 'none',
            zIndex: 2000,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <StyledLoadingPage>
            <Helmet>
              <title>{t('pages.LoadingPage.title')}</title>
            </Helmet>
            <Grid container>
              <Grid item xs={12} textAlign={'center'}>
                <Logo style={{ transform: 'scale(1.3)' }} />
              </Grid>
              <Grid item xs={12}>
                <Box mt={10} mb={2} textAlign={'center'}>
                  <Typography
                    lineHeight={'41px'}
                    mb={6}
                    className={'animateOpacity'}
                    textAlign={'center'}
                    color={'#F6F3F9'}
                    fontWeight={700}
                    fontSize={'32px'}
                  >
                    {t('pages.LoadingPage.pleaseWait')}
                  </Typography>
                  <WindMillSvg />
                </Box>
              </Grid>
            </Grid>
          </StyledLoadingPage>
        </div>
        {children}
      </>
    );
  }
);

LoadingPage.displayName = 'LoadingPage';

export default LoadingPage;
