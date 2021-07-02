import { ReactNode } from 'react';
import { FormFieldTextInputProps } from '../../components/form';
import * as yup from 'yup';
import {
  BaseTextFieldProps,
  BoxProps,
  TypographyVariant,
} from '@material-ui/core';
import { DeepPartial, UnpackNestedValue, UseFormReset } from 'react-hook-form';

export enum GenericFormFieldType {
  TextInput = 'TextInput',
  NumberInput = 'NumberInput',
  Textarea = 'Textarea',
  DatePicker = 'DatePicker',
  Password = 'Password',
}

export interface GenericFormField {
  name: string;
  label: string | null;
  type: GenericFormFieldType;
  frozen?: boolean;
  autocomplete?: boolean;
  multiple?: boolean;
  maxValues?: number;
  startAdornment?: ReactNode;
  endAdornment?: {
    element: ReactNode;
    isValidCheck?: boolean;
  };
  textFieldProps?: BaseTextFieldProps;
}

export interface GenericFormProps<FormValuesType> {
  hideSubmitButton?: boolean;
  submitHandler: (
    values: UnpackNestedValue<FormValuesType>,
    resetForm: UseFormReset<FormValuesType>
  ) => void;
  validationSchema: yup.AnyObjectSchema;
  initialValues: UnpackNestedValue<DeepPartial<FormValuesType>>;
  fields: GenericFormField[];
  buttonText: string;
  buttonFullWidth?: boolean;
  buttonWrapperProps?: BoxProps;
  formTitle?: string;
  formTitleVariant?: TypographyVariant;
  formClass?: string;
  inputsVariant?: FormFieldTextInputProps['variant'];
  formInputsProps?: BaseTextFieldProps;
  processing?: boolean;
}
