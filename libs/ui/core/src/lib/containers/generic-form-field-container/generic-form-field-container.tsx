import styled from '@emotion/styled';
import {
  GenericFormContextData,
  GenericFormField,
  GenericFormFieldType,
} from '../generic-form-container';
import {
  FormFieldPassword,
  FormFieldTextInput,
  FormFieldRadioGroup,
  FormFieldSelect,
} from '../../components';
import { useContext } from 'react';
import { GenericFormContext } from '../../providers';
import Box from '@material-ui/system/Box/Box';

/* eslint-disable-next-line */
export interface GenericFormFieldContainerProps {
  fieldName: string;
}

const StyledGenericFormFieldContainer = styled.div``;

export const GenericFormFieldContainer = ({
  fieldName,
}: GenericFormFieldContainerProps) => {
  const genericFormContext = useContext<GenericFormContextData | null>(
    GenericFormContext
  );
  if (!genericFormContext) {
    console.log(
      'context not set yet :( for GenericFormFieldContainer => ',
      fieldName
    );
    return null;
  } else
    return (
      <StyledGenericFormFieldContainer>
        {renderField(genericFormContext, fieldName)}
      </StyledGenericFormFieldContainer>
    );
};

const renderField = (
  formConfigContextData: GenericFormContextData,
  fieldName: string
) => {
  const genericFormFieldConfig:
    | GenericFormField
    | undefined = formConfigContextData.fields.find(
    (field: GenericFormField) => field.name === fieldName
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
      return null;
    case GenericFormFieldType.TextInput:
      return (
        <FormFieldTextInput
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
      const radioGroupFieldConfig = genericFormFieldConfig as FormFieldRadioGroup;
      return (
        <Box mb={'-10px'}>
          <FormFieldRadioGroup
            field={radioGroupFieldConfig}
            control={formConfigContextData.control}
            disable={radioGroupFieldConfig.frozen ?? false}
            variant={formConfigContextData.inputsVariant}
            errorExists={isFieldInvalid}
            errorText={''}
          />
        </Box>
      );

    case GenericFormFieldType.Password:
      return (
        <FormFieldPassword
          field={genericFormFieldConfig}
          register={formConfigContextData.register}
          errorExists={isFieldInvalid}
          errorText={''}
          isDirty={isFieldDirty}
          variant={formConfigContextData.inputsVariant}
        />
      );

    case GenericFormFieldType.Select:
      // eslint-disable-next-line no-case-declarations
      const selectFieldConfig = genericFormFieldConfig as FormFieldRadioGroup;

      return (
        <FormFieldSelect
          disable={false}
          control={formConfigContextData.control}
          field={selectFieldConfig}
          errorExists={isFieldInvalid}
          errorText={''}
          variant={formConfigContextData.inputsVariant}
        />
      );

    default:
      throw new Error('Field type not supported!');
  }
};

export default GenericFormFieldContainer;
