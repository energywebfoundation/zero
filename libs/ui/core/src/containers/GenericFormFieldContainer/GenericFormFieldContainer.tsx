import styled from '@emotion/styled';
import Box from '@material-ui/system/Box/Box';
import {
  GenericFormContextData,
  GenericFormFieldConfig,
  GenericFormFieldType,
} from '../GenericFormContainer';
import {
  FormFieldPassword,
  FormFieldTextInput,
  FormFieldRadioGroup,
  FormFieldSelect,
  FormFieldDatePicker,
  FormFieldDatePickerConfig,
  FormFieldRadioGroupConfig,
  FormFieldSelectConfig,
} from '../../components';
import { useContext } from 'react';
import { GenericFormContext } from '../../providers';
import {
  FormFieldSwitch,
  FormFieldTextarea,
  FormFieldImageUpload,
  FormFieldFileList,
  FormFieldMap,
  FormFieldMapConfig
} from '../../components';

export interface GenericFormFieldContainerProps {
  fieldName: string;
  boxWidth?: string;
  fullWidth?: boolean;
  contentHeight?: boolean;
  disabled?: boolean;
}

const StyledBox = styled(Box)`
  display: flex;
  margin-top: 24px;
`;

export const GenericFormFieldContainer = ({
  fieldName,
  boxWidth,
  fullWidth,
  disabled,
}: GenericFormFieldContainerProps) => {
  const genericFormContext = useContext<GenericFormContextData | null>(
    GenericFormContext
  );
  if (!genericFormContext) {
    console.error(
      'context not set yet :( for GenericFormFieldContainer => ',
      fieldName
    );
    return null;
  } else
    return (
      <StyledBox
        flexGrow={fullWidth ? 1 : 0}
        width={boxWidth}
        maxWidth={boxWidth}
      >
        {renderField(genericFormContext, fieldName, disabled)}
      </StyledBox>
    );
};

const renderField = (
  formConfigContextData: GenericFormContextData,
  fieldName: string,
  disabled?: boolean
) => {
  const genericFormFieldConfig: GenericFormFieldConfig | undefined =
    formConfigContextData.fields.find(
      (field: GenericFormFieldConfig) => field.name === fieldName
    );

  if (!genericFormFieldConfig) {
    console.log(formConfigContextData);
    throw new Error(`Field "${fieldName}" not found in the config`);
  }

  const fieldErrors = formConfigContextData.errors[fieldName];
  const isFieldInvalid = Boolean(fieldErrors);
  const isFieldDirty = formConfigContextData.dirtyFields[fieldName];

  switch (genericFormFieldConfig.type) {
    case GenericFormFieldType.DatePicker:
      return (
        <FormFieldDatePicker
          field={genericFormFieldConfig as FormFieldDatePickerConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          control={formConfigContextData.control}
          disabled={Boolean((genericFormFieldConfig as FormFieldDatePickerConfig).frozen || disabled)}
        />
      );
    case GenericFormFieldType.TextInput:
      return (
        <FormFieldTextInput
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Textarea:
      return (
        <FormFieldTextarea
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.FileList:
      return (
        <FormFieldFileList
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.ImageUpload:
      return (
        <FormFieldImageUpload
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.RadioGroup:
      return (
        <FormFieldRadioGroup
          field={genericFormFieldConfig as FormFieldRadioGroupConfig}
          control={formConfigContextData.control}
          disable={((genericFormFieldConfig as FormFieldRadioGroupConfig).frozen || disabled) ?? false}
          variant={formConfigContextData.inputsVariant}
          errorExists={isFieldInvalid}
          errorText={''}
        />
      );

    case GenericFormFieldType.Password:
      return (
        <FormFieldPassword
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Select:
      return (
        <FormFieldSelect
          disabled={disabled}
          control={formConfigContextData.control}
          field={genericFormFieldConfig as FormFieldSelectConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Autocomplete:
      return (
        <FormFieldSelect
          disabled={disabled}
          control={formConfigContextData.control}
          field={genericFormFieldConfig as FormFieldSelectConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Switch:
      return (
        <FormFieldSwitch
          field={genericFormFieldConfig as FormFieldSwitch}
          control={formConfigContextData.control}
          disable={(genericFormFieldConfig as FormFieldSwitch).frozen ?? false}
          variant={formConfigContextData.inputsVariant}
          errorExists={isFieldInvalid}
          errorText={''}
        />
      );

    case GenericFormFieldType.Map:
      return (
        <FormFieldMap
          register={formConfigContextData.register}
          disabled={(genericFormFieldConfig as FormFieldMapConfig).disabled ?? false}
          errorExists={isFieldInvalid}
          errorText={''}
          field={genericFormFieldConfig as FormFieldMapConfig}
        />
      );

    default:
      throw new Error('Field type not supported!');
  }
};
