import { Box, Button, Typography } from '@material-ui/core';
import React, { PropsWithChildren, ReactElement } from 'react';
import { useGenericFormEffects } from './GenericForm.effects';
import { GenericFormProps } from './GenericForm.types';

export type TGenericForm = <FormValuesType>(
  props: PropsWithChildren<GenericFormProps<FormValuesType>>
) => ReactElement;

export const GenericForm: TGenericForm = ({
  submitHandler,
  validationSchema,
  initialValues,
  formTitleVariant,
  formTitle,
  fields,
  buttonText,
  buttonFullWidth,
  buttonWrapperProps,
  children,
  formClass,
  inputsVariant,
  formInputsProps,
  processing,
  hideSubmitButton,
}) => {
  const {
    control,
    register,
    onSubmit,
    errors,
    buttonDisabled,
    dirtyFields,
  } = useGenericFormEffects({
    validationSchema,
    submitHandler,
    initialValues,
  });

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {formTitle && (
        <Box>
          <Typography variant={formTitleVariant ?? 'h4'}>
            {formTitle}
          </Typography>
        </Box>
      )}
      {children}
      <Box
        hidden={hideSubmitButton}
        my={2}
        display="flex"
        justifyContent="flex-end"
        {...buttonWrapperProps}
      >
        <Button
          fullWidth={buttonFullWidth}
          color="primary"
          name="submit"
          size="large"
          variant="contained"
          disabled={buttonDisabled}
          type="submit"
        >
          {buttonText}
        </Button>
      </Box>
    </form>
  );
};
