import styled from '@emotion/styled';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useStyles } from './generic-form-multi-step.styles';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  UploadFileOutlined,
} from '@material-ui/icons';
import GenericFormMultiStepContextProvider, {
  GenericFormMultiStepContext,
} from '../../providers/generic-form-multi-step-context-provider/generic-form-multi-step-context-provider';

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
  handleActiveIndexChange?: (index: number) => void;
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
  handleActiveIndexChange,
  formTitle,
}: GenericFormStepListProps<T>) => {
  const styles = useStyles();
  const activeStep = stepList[activeStepIndex];
  const [disableNextStepBtn, setDisableNextStepBtn] = useState<boolean>(true);

  return (
    <GenericFormMultiStepContextProvider>
      <>
        <GenericFormMultiStepContext.Consumer>
          {(value) => {
            const { isActiveStepValid } = value!;
            const disable = !isActiveStepValid;
            // setDisableNextStepBtn(disable);
            return null;
          }}
        </GenericFormMultiStepContext.Consumer>
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
            {handleActiveIndexChange && (
              <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Button
                    disabled={!activeStepIndex}
                    onClick={() => {
                      handleActiveIndexChange(activeStepIndex - 1);
                    }}
                    variant={'contained'}
                    endIcon={<ChevronLeft />}
                  >
                    Back
                  </Button>
                  <div>
                    {activeStep.supportCsv && (
                      <Button
                        variant={'contained'}
                        endIcon={<UploadFileOutlined />}
                      >
                        Load CSV
                      </Button>
                    )}
                    <Button
                      disabled={
                        activeStepIndex >= stepList.length || disableNextStepBtn
                      }
                      onClick={() => {
                        handleActiveIndexChange(activeStepIndex + 1);
                      }}
                      sx={{ ml: 2 }}
                      variant={'contained'}
                      endIcon={<ChevronRight />}
                    >
                      Next
                    </Button>
                  </div>
                </Box>
              </Grid>
            )}
          </Grid>
        </StyledGenericFormStepList>
      </>
    </GenericFormMultiStepContextProvider>
  );
};

export default GenericFormMultiStep;
