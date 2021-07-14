import { BaseTextFieldProps } from '@material-ui/core';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import {
  TGenericFormEffectsReturnType,
  useGenericFormEffects,
} from './generic-form-container.effects';
import GenericFormContextProvider from '../../providers/generic-form-context-provider/generic-form-context-provider';
import { DeepPartial, UnpackNestedValue, UseFormReset } from 'react-hook-form';
import * as yup from 'yup';
import {
  FormFieldRadioGroup,
  FormFieldSelect,
  FormFieldTextInputProps,
} from '../../components';
import { useTranslation } from 'react-i18next';

export enum GenericFormFieldType {
  TextInput = 'TextInput',
  NumberInput = 'NumberInput',
  Textarea = 'Textarea',
  DatePicker = 'DatePicker',
  Password = 'Password',
  RadioGroup = 'RadioGroup',
  Select = 'Select',
}

export interface GenericFormField {
  name: string;
  label: string | null;
  frozen?: boolean;
  autocomplete?: boolean;
  multiple?: boolean;
  maxValues?: number;
  type: GenericFormFieldType;
  startAdornment?: ReactNode;
  endAdornment?: {
    element: ReactNode;
    isValidCheck?: boolean;
  };
  textFieldProps?: BaseTextFieldProps;
}

export type TGenericFormFieldList = Array<
  GenericFormField | FormFieldRadioGroup | FormFieldSelect
>;

export type TGenericFormSubmitHandlerFn<FormValuesType, ResponseType = any> = (
  values: UnpackNestedValue<FormValuesType>,
  resetForm: UseFormReset<FormValuesType>
) => Promise<ResponseType>;

export interface GenericFormContainerProps<FormValuesType> {
  submitHandler: TGenericFormSubmitHandlerFn<FormValuesType>;
  validationSchema: yup.AnyObjectSchema;
  initialValues: UnpackNestedValue<DeepPartial<FormValuesType>>;
  fields: TGenericFormFieldList;
  formClass?: string;
  inputsVariant?: FormFieldTextInputProps['variant'];
  formInputsProps?: BaseTextFieldProps;
  processing?: boolean;
}

export type TGenericForm = <FormValuesType>(
  props: PropsWithChildren<GenericFormContainerProps<FormValuesType>>
) => ReactElement;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type GenericFormContextData = Omit<
  TGenericFormEffectsReturnType<any>,
  'onSubmit'
> &
  Omit<
    GenericFormContainerProps<any>,
    'submitHandler' | 'validationSchema' | 'formClass' | 'initialValues'
  >;

export const GenericFormContainer: TGenericForm = ({
  submitHandler,
  validationSchema,
  initialValues,
  fields,
  children,
  formClass,
  inputsVariant,
  formInputsProps,
  processing,
}) => {
  const {
    control,
    register,
    onSubmit,
    errors,
    dirtyFields,
    isDirty,
    isValid,
    touchedFields,
    isSubmitting,
    getValues,
  } = useGenericFormEffects({
    validationSchema,
    submitHandler,
    initialValues,
  });

  const { t } = useTranslation();

  const context: GenericFormContextData = {
    control,
    register,
    dirtyFields,
    errors,
    inputsVariant,
    formInputsProps,
    processing,
    isDirty,
    isValid,
    isSubmitting,
    touchedFields,
    getValues,
    fields: fields.map((field) => ({
      ...field,
      label: field.label ? t(field.label) : null,
    })),
  };

  return (
    <form onSubmit={onSubmit} className={formClass}>
      <GenericFormContextProvider formConfig={context}>
        {children}
      </GenericFormContextProvider>
    </form>
  );
};
