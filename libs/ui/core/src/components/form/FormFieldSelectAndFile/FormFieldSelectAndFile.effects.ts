import { ChangeEvent, useContext } from "react";
import { GenericFormFieldConfig } from "../../../containers";
import { GenericFormContext } from "../../../providers";
import { FileTypeEnum, StoredFile } from "../../file";
import { FormSelectOption } from "../FormFieldSelect";

export type SelectAndFileFieldItem = {
  id: number;
  select: string;
  fileId?: string;
  fileName?: string;
  fileType?: FileTypeEnum;
};

export interface FormFieldSelectAndFileConfig extends Omit<GenericFormFieldConfig, 'autocomplete' | 'multiple' | 'maxValues'> {
  options: FormSelectOption[];
  acceptedFileTypes: FileTypeEnum[];
  fileUploadHandler: (file: File) => Promise<StoredFile>;
  fileRemoveHandler: (fileId: string) => void;
  addItemBtnText?: string;
  uploadButtonText?: string;
}

export const useFormFieldSelectAndFileEffects = (field: FormFieldSelectAndFileConfig) => {
  const { getValues, watch, setValue } = useContext(GenericFormContext)!;

  const handleAddNewItem = () => {
    const oldValues: SelectAndFileFieldItem[] | [] = getValues(field.name) ?? [];
    setValue(field.name, [...oldValues, {
      id: Date.now(),
      select: ''
    }])
  };

  const handleSelectValueChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const oldValues = getValues(field.name) as SelectAndFileFieldItem[];
    const adjustedValues = [...oldValues].map(item => {
      if(item.id === id) {
        return {
          ...item,
          select: event.target.value
        }
      } else {
        return item;
      }
    });
    setValue(field.name, adjustedValues);
  };

  const handleFileUpload = async (id: number, file: File) => {
    const storedFile = await field.fileUploadHandler(file);
    const oldValues = getValues(field.name) as SelectAndFileFieldItem[];
    const adjustedValues = [...oldValues].map(item => {
      if(item.id === id) {
        return {
          ...item,
          fileId: storedFile.id,
          fileName: storedFile.name,
          fileType: storedFile.type
        }
      } else {
        return item;
      }
    });
    setValue(field.name, adjustedValues);
  };

  const handleFileRemove = async (id: number, fileId: string) => {
    await field.fileRemoveHandler(fileId);
    const oldValues = getValues(field.name) as SelectAndFileFieldItem[];
    const adjustedValues = [...oldValues].map(item => {
      if(item.id === id) {
        return {
          ...item,
          fileId: undefined,
          fileName: undefined,
          fileType: undefined
        }
      } else {
        return item;
      }
    });
    setValue(field.name, adjustedValues);
  }

  const items = watch(field.name) as SelectAndFileFieldItem[];

  return {
    items,
    handleSelectValueChange,
    handleAddNewItem,
    handleFileUpload,
    handleFileRemove
  };
}
