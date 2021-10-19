import { Button, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldSelectRegular } from "../FormFieldSelectRegular";
import { FormFieldSelectAndFileConfig, useFormFieldSelectAndFileEffects } from "./FormFieldSelectAndFile.effects";
import { FieldSelectAndFileUpload } from "./FieldSelectAndFileUpload";

export interface FormFieldSelectAndFileProps {
  field: FormFieldSelectAndFileConfig;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  isProcessing?: boolean;
};

export const FormFieldSelectAndFile: FC<FormFieldSelectAndFileProps> = ({
  field,
  register,
  errorExists,
  errorText,
  variant,
  disabled,
  isProcessing
}) => {
  register(field.name);
  const {
    items,
    handleSelectValueChange,
    handleAddNewItem,
    handleFileUpload,
    handleFileRemove
  } = useFormFieldSelectAndFileEffects(field);
  const { t } = useTranslation();

  return (
    <Grid container columnSpacing={'25px'}>
      <Grid item xs={12}>
      {items.length > 0 ?
        items.map((item) => (
          <Grid container key={`${item.id}`} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormFieldSelectRegular
                errorExists={errorExists}
                errorText={errorText}
                field={field}
                value={item.select}
                variant={variant}
                onChange={(event) => handleSelectValueChange(item.id, event)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FieldSelectAndFileUpload
                id={item.id}
                fileId={item.fileId ?? ''}
                fileName={item.fileName ?? ''}
                fileType={item.fileType}
                acceptedTypes={field.acceptedFileTypes}
                handleFileUpload={handleFileUpload}
                handleFileRemove={handleFileRemove}
                uploadButtonText={field.uploadButtonText}
                isProcessing={isProcessing}
              />
            </Grid>
          </Grid>
        ))
        : null
      }
      </Grid>
      <Grid item xs={12} mt={items.length > 0 ? 2 : 0}>
        <Button
          variant="contained"
          startIcon={<Add />}
          disabled={disabled || isProcessing}
          onClick={handleAddNewItem}
        >
          {t(field.addItemBtnText ?? 'Add') }
        </Button>
      </Grid>
    </Grid>
  )
}
