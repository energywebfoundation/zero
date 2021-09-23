import styled from '@emotion/styled';
import { BaseSyntheticEvent, ReactElement, useContext } from 'react';
import { GenericFormContextData } from '../generic-form-container';
import { GenericFormContext } from '../../providers';
import { Typography } from '@material-ui/core';

interface GenericFormSubmitButtonContainerRenderProps {
  isValid: boolean;
  isDirty: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  isSubmitting: boolean;
}
/* eslint-disable-next-line */
export interface GenericFormSubmitButtonContainerProps {
  render: ({
    onSubmit,
    isValid,
    isDirty,
    isSubmitting,
  }: GenericFormSubmitButtonContainerRenderProps) => ReactElement;
}

const StyledGenericFormSubmitButtonContainer = styled.div``;

export const GenericFormSubmitButtonContainer = (
  props: GenericFormSubmitButtonContainerProps
) => {
  const genericFormContext = useContext<GenericFormContextData | null>(
    GenericFormContext
  );
  if (!genericFormContext) {
    console.error(
      'context not set yet :( for GenericFormFieldContainer => GenericFormSubmitButtonContainer ' +
        '( or its was not placed within GenericFormContainer )'
    );
    return null;
  } else {
    const { isValid, isDirty, isSubmitting, onSubmit } = genericFormContext;
    return (
      <StyledGenericFormSubmitButtonContainer>
        {props.render({ isValid, isDirty, isSubmitting, onSubmit })}
      </StyledGenericFormSubmitButtonContainer>
    );
  }
};

export default GenericFormSubmitButtonContainer;
