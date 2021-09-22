import { BaseTextFieldProps } from '@material-ui/core';
import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import {
  TGenericFormEffectsReturnType,
  useGenericFormEffects,
} from './generic-form-container.effects';
import GenericFormContextProvider from '../../providers/generic-form-context-provider/generic-form-context-provider';
import { DeepPartial, UnpackNestedValue, UseFormReset } from 'react-hook-form';
import * as yup from 'yup';
import {
  FormFieldRadioGroupConfig,
  FormFieldSelectConfig,
  FormFieldTextInputProps,
} from '../../components';
import { useTranslation } from 'react-i18next';
import { Observable } from 'rxjs';
import { ValidationError } from 'yup';

export enum GenericFormFieldType {
  TextInput = 'TextInput',
  NumberInput = 'NumberInput',
  Textarea = 'Textarea',
  DatePicker = 'DatePicker',
  Password = 'Password',
  RadioGroup = 'RadioGroup',
  Select = 'Select',
  Switch = 'Switch',
  ImageUpload = 'ImageUpload',
  FileList = 'FileList',
  GreenLabelList = 'GreenLabelList',
  FacilityDocumentList = 'FacilityDocumentList',
  Autocomplete = 'Autocomplete',
  Map = 'Map',
}

export interface GenericFormFieldConfig {
  name: string;
  label: string | null;
  required?: boolean;
  frozen?: boolean;
  placeholderText?: string;
  helperText?: string;
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
  infoTooltip?: string;
  characterCountLimit?: number;
  helpBoxText?: string;
}

export type TGenericFormFieldList = Array<
  GenericFormFieldConfig | FormFieldRadioGroupConfig | FormFieldSelectConfig
>;

export type TGenericFormSubmitHandlerFn<
  FormValuesType,
  ResponseType = unknown
> = (
  values: UnpackNestedValue<FormValuesType>,
  resetForm: UseFormReset<FormValuesType>
) => Promise<ResponseType>;

export interface GenericFormContainerProps<FormValuesType> {
  formName?: string;
  readOnlyForm?: boolean;
  nested?: boolean;
  submitHandler: TGenericFormSubmitHandlerFn<FormValuesType>;
  validationSchema: yup.AnyObjectSchema;
  initialValues: UnpackNestedValue<DeepPartial<FormValuesType>>;
  fields: TGenericFormFieldList;
  formClass?: string;
  inputsVariant?: FormFieldTextInputProps['variant'];
  formInputsProps?: BaseTextFieldProps;
  processing?: boolean;
  subscribeValuesChanged$?: (values$: Observable<FormValuesType>) => void;
  handleValidityChange?: (
    isFormValid: boolean,
    errors: ValidationError[]
  ) => void;
  handleDirtyChange?: (isFormDirty: boolean) => void;
}

export type TGenericForm = <FormValuesType>(
  props: PropsWithChildren<GenericFormContainerProps<FormValuesType>>
) => ReactElement;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type GenericFormContextData = { readOnlyForm?: boolean } & Omit<
  TGenericFormEffectsReturnType<any>,
  'handleValuesChanged$'
> &
  Omit<
    GenericFormContainerProps<unknown>,
    | 'submitHandler'
    | 'validationSchema'
    | 'formClass'
    | 'initialValues'
    | 'subscribeValuesChanged$'
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
  subscribeValuesChanged$,
  nested,
  readOnlyForm,
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
    setValue,
  } = useGenericFormEffects({
    validationSchema,
    submitHandler,
    initialValues,
    subscribeValuesChanged$,
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
    nested,
    onSubmit,
    setValue,
    readOnlyForm,
    fields: fields.map((field) => ({
      ...field,
      label: field.label ? t(field.label) : null,
    })),
  };

  return !nested ? (
    <form onSubmit={onSubmit} className={formClass}>
      <GenericFormContextProvider formConfig={context}>
        {children}
      </GenericFormContextProvider>
    </form>
  ) : (
    <div>
      <GenericFormContextProvider formConfig={context}>
        {children}
      </GenericFormContextProvider>
    </div>
  );
};
