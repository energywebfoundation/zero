import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Box, Button, Grid } from '@material-ui/core';
import {
  GenericFormSubmitButtonContainer,
} from '@energyweb/zero-ui-core';

export const FormNavigation = ({
  activeStepIndex,
  handleNavigateToPrevStep,
  handleNavigateToNextStep,
}: {
  activeStepIndex: number;
  handleNavigateToPrevStep: () => void;
  handleNavigateToNextStep: () => void;
}) => (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button
          onClick={() => handleNavigateToPrevStep()}
          startIcon={<ChevronLeft />}
          variant={'contained'}
          color={'primary'}
          disabled={activeStepIndex === 0}
        >
          prev
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
              disabled={!isValid || !isDirty || isSubmitting}
            >
              next
            </Button>
          )}
        />
      </Box>
    </Grid>
  </Grid>
);
