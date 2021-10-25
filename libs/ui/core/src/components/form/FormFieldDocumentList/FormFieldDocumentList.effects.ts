import { filesControllerGetFileMetadata } from "@energyweb/zero-api-client";
import { useContext, useEffect, useState } from "react";
import { GenericFormFieldConfig } from "../../../containers";
import { GenericFormContext } from "../../../providers";
import { FormDocument } from "../FormDocumentItem";

export const useFormFieldDocumentListEffects = (field: Omit<
  GenericFormFieldConfig,
  'autocomplete' | 'multiple' | 'maxValues'
>) => {
  const { getValues, setValue } = useContext(GenericFormContext)!;
  const initialState = getValues(field.name) ?? [];
  const [list, setList] = useState<FormDocument[]>(initialState);

  const handleFacilityDocumentListChanged = (docsList: FormDocument[]) => {
    setValue(field.name, docsList);
  };

  const handleDescriptionChanged = (fileId: string, description: string) => {
    setList(
      list.map((el) => (fileId === el.id ? { ...el, description } : el))
    );
  };

  const handleRemoveDocument = (fileId: string) => {
    setList(list.filter((el) => el.id !== fileId));
  };

  const handleFileSelectionSubmit = async (fileId: string) => {
    // bad, should be more generic
    const fileMetadata = await filesControllerGetFileMetadata(fileId);
    setList([...list, {
      id: fileId,
      name: fileMetadata?.filename,
      type: fileMetadata?.fileType,
    }]);
  }

  useEffect(() => {
    handleFacilityDocumentListChanged(list);
  }, [list]);

  return { handleDescriptionChanged, handleRemoveDocument, handleFileSelectionSubmit, list };
}
