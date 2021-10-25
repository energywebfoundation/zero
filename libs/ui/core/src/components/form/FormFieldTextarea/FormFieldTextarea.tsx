import { FC, memo, useContext } from 'react';
import { Box, TextField } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GenericFormFieldConfig } from '../../../containers';
import { CharacterCountLimit } from '../../layout';
import { GenericFormContext } from '../../../providers';

export interface FormFieldTextareaProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  >;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldTextarea: FC<FormFieldTextareaProps> = memo(
  ({
    field,
    register,
    variant,
    disabled
  }) => {
    const { label, helperText, placeholderText, characterCountLimit } = field;
    const { t } = useTranslation();
    const { name, onBlur, onChange, ref } = register(field.name);
    const formContext = useContext(GenericFormContext);
    const fieldValue = formContext && formContext.watch(field.name);

    if (!formContext) {
      throw new Error('FormFieldTextarea cannot be used outside of GenericFormContext');
    };

    return (
      <Box flexWrap={'nowrap'} minWidth={'100%'}>
        <Box width={'100%'}>
          {helperText && <div>{t(helperText)}</div>}
          <TextField
            inputRef={ref}
            placeholder={t(placeholderText || '')}
            variant={variant || 'outlined'}
            fullWidth
            minRows={4}
            label={label}
            multiline
            name={name}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            {...field.textFieldProps}
          />
        </Box>
        {characterCountLimit && (
          <Box>
            <CharacterCountLimit
              characterCountLimit={characterCountLimit}
              value={fieldValue}
            />
          </Box>
        )}
      </Box>
    );
  }
);

FormFieldTextarea.displayName = 'FormFieldTextarea';
