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
  FormFieldGreenLabelList,
  FormFieldFacilityDocumentList,
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

const StyledGenericFormFieldContainer = styled(Box)`
  display: flex;
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
      <StyledGenericFormFieldContainer
        flexGrow={fullWidth ? 1 : 0}
        width={boxWidth}
        maxWidth={boxWidth}
      >
        {renderField(genericFormContext, fieldName, disabled)}
      </StyledGenericFormFieldContainer>
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
      const formFieldDatePickerConfig =
        genericFormFieldConfig as FormFieldDatePickerConfig;
      return (
        <FormFieldDatePicker
          field={formFieldDatePickerConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          control={formConfigContextData.control}
          disabled={Boolean(formFieldDatePickerConfig.frozen || disabled)}
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

    case GenericFormFieldType.FacilityDocumentList:
      return (
        <FormFieldFacilityDocumentList
          disabled={disabled}
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.GreenLabelList:
      return (
        <FormFieldGreenLabelList
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
      // eslint-disable-next-line no-case-declarations
      const radioGroupFieldConfig =
        genericFormFieldConfig as FormFieldRadioGroupConfig;
      return (
        <FormFieldRadioGroup
          field={radioGroupFieldConfig}
          control={formConfigContextData.control}
          disable={(radioGroupFieldConfig.frozen || disabled) ?? false}
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
      const selectFieldConfig = genericFormFieldConfig as FormFieldSelectConfig;

      return (
        <FormFieldSelect
          disabled={disabled}
          control={formConfigContextData.control}
          field={selectFieldConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Autocomplete:
      const autocompleteFieldConfig =
        genericFormFieldConfig as FormFieldSelectConfig;

      return (
        <FormFieldSelect
          disabled={disabled}
          control={formConfigContextData.control}
          field={autocompleteFieldConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Switch:
      const switchFieldConfig = genericFormFieldConfig as FormFieldSwitch;
      return (
        <FormFieldSwitch
          field={switchFieldConfig}
          control={formConfigContextData.control}
          disable={switchFieldConfig.frozen ?? false}
          variant={formConfigContextData.inputsVariant}
          errorExists={isFieldInvalid}
          errorText={''}
        />
      );

    case GenericFormFieldType.Map:
      const mapFieldConfig = genericFormFieldConfig as FormFieldMapConfig;
      return (
        <FormFieldMap
          register={formConfigContextData.register}
          disabled={mapFieldConfig.disabled ?? false}
          errorExists={isFieldInvalid}
          errorText={''}
          field={mapFieldConfig}
        />
      );

    default:
      throw new Error('Field type not supported!');
  }
};

export default GenericFormFieldContainer;
