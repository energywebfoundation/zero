import { TextFieldProps } from '@material-ui/core';
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { DeepPartial, UnpackNestedValue, UseFormReset, ValidationMode } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'yup';
import { GenericFormContextProvider } from '../../providers';
import {
  FormFieldRadioGroupConfig,
  FormFieldSelectAndFileConfig,
  FormFieldSelectConfig,
  FormFieldTextInputProps,
  FormFieldMapConfig
} from '../../components/form';
import {
  TGenericFormEffectsReturnType,
  useGenericFormEffects,
} from './GenericFormContainer.effects';

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
  LabelList = 'LabelList',
  DocumentList = 'DocumentList',
  Autocomplete = 'Autocomplete',
  Map = 'Map',
  SelectAndFile = 'SelectAndFile'
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
  type?: GenericFormFieldType;
  startAdornment?: ReactNode;
  endAdornment?: {
    element: ReactNode;
    isValidCheck?: boolean;
  };
  textFieldProps?: TextFieldProps;
  infoTooltip?: string;
  characterCountLimit?: number;
  helpBoxText?: string;
}

export type TGenericFormFieldList = Array<
  GenericFormFieldConfig | FormFieldRadioGroupConfig | FormFieldSelectConfig | FormFieldSelectAndFileConfig | FormFieldMapConfig
>;

export type TGenericFormSubmitHandlerFn<
  FormValuesType,
  ResponseType = unknown
> = (
  values: UnpackNestedValue<FormValuesType>,
  resetForm: UseFormReset<FormValuesType>
) => ResponseType | Promise<ResponseType>;

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
  formInputsProps?: TextFieldProps;
  processing?: boolean;
  handleValidityChange?: (
    isFormValid: boolean,
    errors: ValidationError[]
  ) => void;
  handleDirtyChange?: (isFormDirty: boolean) => void;
  validationMode?: keyof ValidationMode;
}

export type TGenericForm = <FormValuesType>(
  props: PropsWithChildren<GenericFormContainerProps<FormValuesType>>
) => ReactElement;

export type GenericFormContextData = { readOnlyForm?: boolean } & TGenericFormEffectsReturnType<any> &
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
  nested,
  readOnlyForm,
  validationMode
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
    watch
  } = useGenericFormEffects({
    validationSchema,
    submitHandler,
    initialValues,
    validationMode
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
    watch,
    fields: fields.map((field) => ({
      ...field,
      // temporary until find out reason
      label: (field as any).label ? t((field as any).label) : null,
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
