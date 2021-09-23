import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@material-ui/core';
import { useStyles } from './generic-form-multi-step.styles';
import clsx from 'clsx';
import { ReactNode } from 'react';
import GenericFormMultiStepContextProvider from '../../providers/generic-form-multi-step-context-provider/generic-form-multi-step-context-provider';

/* eslint-disable-next-line */
export interface GenericFormStepListProps<T> {
  stepList: Array<{
    stepLabel: string;
    stepItemNode: ReactNode;
    stepTitle?: string;
    supportCsv?: boolean;
  }>;
  formTitle: string;
  activeStepIndex: number;
  isProcessing?: boolean;
  showDraftSavedMsg?: boolean;
  processingCompletedSuccessfullyText?: string;
  processingErrorText?: string;
}

const StyledGenericFormStepList = styled.div`
  width: calc(100% - 16px);
`;

export const GenericFormMultiStep = <T extends unknown>({
  stepList,
  activeStepIndex,
  formTitle,
}: GenericFormStepListProps<T>) => {
  const styles = useStyles();
  const activeStep = stepList[activeStepIndex];

  return (
    <GenericFormMultiStepContextProvider>
      <>
        <StyledGenericFormStepList className={styles.root}>
          <Grid container rowSpacing={'17px'} justifyContent={'space-between'}>
            <Grid
              item
              xs={12}
              sm={6}
              flexDirection={'row'}
              alignContent={'space-between'}
            >
              <div>breadcrumbs are here</div>
              <Typography color={'primary'} fontSize={'24px'} fontWeight={700}>
                {activeStep.stepTitle ?? formTitle}
              </Typography>
            </Grid>
            <Grid xs={12} sm={5} item>
              <Box
                display={'flex'}
                width={'100%'}
                justifyContent={'space-evenly'}
              >
                {stepList?.map(({ stepLabel }, index) => (
                  <Box
                    className={clsx({ active: activeStepIndex >= index })}
                    ml={'20px'}
                    key={index}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                  >
                    <div className={styles.circle}>{index + 1}</div>
                    <span className={styles.stepLabel}>{stepLabel}</span>
                  </Box>
                )) || 'no steps'}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>{activeStep.stepItemNode}</Box>
            </Grid>
          </Grid>
        </StyledGenericFormStepList>
      </>
    </GenericFormMultiStepContextProvider>
  );
};

export default GenericFormMultiStep;
