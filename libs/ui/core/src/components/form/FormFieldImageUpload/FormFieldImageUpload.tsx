import { FC, memo, useContext } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GenericFormFieldConfig } from '../../../containers';
import { GenericFormContext } from '../../../providers';
import { ImageUploadContainer } from '../../image';

export type FieldImageUploadConfig = Omit<
  GenericFormFieldConfig,
  'autocomplete' | 'multiple' | 'maxValues'
> & {
  title: string;
  subtitle: string;
}

export interface FormFieldImageUploadProps {
  field: FieldImageUploadConfig;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldImageUpload: FC<FormFieldImageUploadProps> = memo(
  ({
    field,
    register,
  }) => {
    const { t } = useTranslation();
    register(field.name);
    const { setValue, watch } = useContext(GenericFormContext)!;
    const imageList: string[] = watch(field.name);

    const handleUploadSuccess = (fileList: string[]) => {
      setValue(field.name, [...imageList, ...fileList]);
    };

    return (
      <ImageUploadContainer
        title={t(field.title)}
        subtitle={t(field.subtitle)}
        handleUploadSuccess={handleUploadSuccess}
      />
    );
  }
);
