import React, { FC, memo, useState } from 'react';
import { BaseTextFieldProps, Box, TextField } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers';
import { useTranslation } from 'react-i18next';
import { CharacterCountLimit } from '../../character-count-limit/character-count-limit';
import { useStyles } from './form-field-textarea.styles';

export interface FormFieldTextareaProps extends BaseTextFieldProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  > &
    BaseTextFieldProps;
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
    errorExists,
    errorText,
    isDirty,
    variant,
    disabled,
    ...rest
  }) => {
    const { label, helperText, placeholderText, characterCountLimit } = field;
    const { t } = useTranslation();
    const { name, onBlur, onChange } = register(field.name);
    const styles = useStyles();
    const [fieldValue, setFieldValue] = useState<string | null>(null);
    return (
      <Box flexWrap={'nowrap'} minWidth={'100%'}>
        <Box width={'100%'}>
          {helperText && <div>{t(helperText)}</div>}
          <TextField
            inputRef={(instance) => setFieldValue(instance?.value)}
            className={styles.root}
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
