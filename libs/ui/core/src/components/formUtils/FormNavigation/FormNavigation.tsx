import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Box, Button, Grid } from '@material-ui/core';
import { GenericFormSubmitButtonContainer } from '../GenericFormSubmitButtonContainer';
import { FC } from 'react';

interface FormNavigationProps {
  handleNavigateToPrevStep: () => void;
  handleNavigateToNextStep: () => void;
  btnClass?: string;
}

export const FormNavigation: FC<FormNavigationProps> = ({
  handleNavigateToPrevStep,
  handleNavigateToNextStep,
  btnClass
}) => (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button
          onClick={() => handleNavigateToPrevStep()}
          startIcon={<ChevronLeft />}
          variant={'contained'}
          color={'primary'}
          className={btnClass}
        >
          Back
        </Button>
        <GenericFormSubmitButtonContainer
          render={({ onSubmit, isValid, isDirty, isSubmitting }) => (
            <Button
              endIcon={<ChevronRight />}
              onClick={() => {
                onSubmit().then((value) => handleNavigateToNextStep());
              }}
              color={'primary'}
              variant={'contained'}
              disabled={isSubmitting}
              className={btnClass}
            >
              Next
            </Button>
          )}
        />
      </Box>
    </Grid>
  </Grid>
);
