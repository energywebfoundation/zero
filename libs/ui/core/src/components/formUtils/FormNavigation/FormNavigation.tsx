import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Box, Button, ButtonProps, Grid } from '@material-ui/core';
import { FC, useContext } from 'react';
import { GenericFormSubmitButtonContainer } from '../GenericFormSubmitButtonContainer';
import { GenericFormContext } from '../../../providers';

interface FormNavigationProps {
  handleNavigateToPrevStep: () => void;
  handleNavigateToNextStep: (formData?: any) => void;
  backButtonText: string;
  nextButtonText: string;
  backButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  btnClass?: string;
}

export const FormNavigation: FC<FormNavigationProps> = ({
  backButtonText,
  nextButtonText,
  handleNavigateToPrevStep,
  handleNavigateToNextStep,
  backButtonProps,
  nextButtonProps,
  btnClass
}) => {
  const { getValues } = useContext(GenericFormContext)!;

  return (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button
          onClick={handleNavigateToPrevStep}
          startIcon={<ChevronLeft />}
          variant={'contained'}
          color={'primary'}
          className={btnClass}
          {...backButtonProps}
        >
          {backButtonText}
        </Button>
        <GenericFormSubmitButtonContainer
          render={({ isSubmitting }) => (
            <Button
              endIcon={<ChevronRight />}
              onClick={() => handleNavigateToNextStep(getValues())}
              color={'primary'}
              variant={'contained'}
              disabled={isSubmitting}
              className={btnClass}
              {...nextButtonProps}
            >
              {nextButtonText}
            </Button>
          )}
        />
      </Box>
    </Grid>
  </Grid>
);
}
