import {
  Step,
  StepLabel,
  Stepper,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import map from 'lodash/fp/map';
import React, { FC } from 'react';
import { useStyles } from './StepReport.styles';

export interface StepReportProps {
  activeStep: number;
  labels: string[];
}

export const StepReport: FC<StepReportProps> = ({ labels, activeStep }) => {
  const classes = useStyles();
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Stepper
      alternativeLabel={smallScreen}
      className={classes.stepper}
      activeStep={activeStep}
    >
      {map((label: string) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: { optional?: React.ReactNode } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      }, labels)}
    </Stepper>
  );
};
