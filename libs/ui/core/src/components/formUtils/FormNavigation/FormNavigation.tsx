import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Box, Button, Grid } from '@material-ui/core';
import { FC, useContext } from 'react';
import { GenericFormSubmitButtonContainer } from '../GenericFormSubmitButtonContainer';
import { GenericFormContext } from '../../../providers';

interface FormNavigationProps {
  handleNavigateToPrevStep: () => void;
  handleNavigateToNextStep: (formData?: any) => void;
  btnClass?: string;
}

export const FormNavigation: FC<FormNavigationProps> = ({
  handleNavigateToPrevStep,
  handleNavigateToNextStep,
  btnClass
}) => {
  const { getValues } = useContext(GenericFormContext)!;

  return (
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
          render={({ isSubmitting }) => (
            <Button
              endIcon={<ChevronRight />}
              onClick={() => handleNavigateToNextStep(getValues())}
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
}
