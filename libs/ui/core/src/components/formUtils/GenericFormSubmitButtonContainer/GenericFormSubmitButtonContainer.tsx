import { BaseSyntheticEvent, ReactElement, useContext } from 'react';
import { GenericFormContextData } from '../../../containers';
import { GenericFormContext } from '../../../providers';

interface GenericFormSubmitButtonContainerRenderProps {
  isValid: boolean;
  isDirty: boolean;
  onSubmit: (e?: BaseSyntheticEvent<Record<string, any>>) => Promise<void>;
  isSubmitting: boolean;
}

export interface GenericFormSubmitButtonContainerProps {
  render: ({
    onSubmit,
    isValid,
    isDirty,
    isSubmitting,
  }: GenericFormSubmitButtonContainerRenderProps) => ReactElement;
}

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
      <div>
        {props.render({ isValid, isDirty, isSubmitting, onSubmit })}
      </div>
    );
  }
};
