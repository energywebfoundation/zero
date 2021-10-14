import { useEffect, useState } from 'react';
import { noop } from 'lodash';
import { UseMutateAsyncFunction } from 'react-query';
import { FormDocument } from '../FormDocumentItem';
import { FormDocumentList } from '../FormDocumentList';
import { UploadFile, UploadFileResponse } from '../../file';

export interface FacilityDocumentListContainerProps {
  data: FormDocument[];
  handleFacilityDocumentListChanged: (
    facilityDocumentList: FormDocument[]
  ) => void;
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>;
  isLoading?: boolean;
}

export const FormFieldDocumentListContainer = ({
  handleFacilityDocumentListChanged,
  data,
  mutateUpload,
  isLoading
}: FacilityDocumentListContainerProps) => {
  const [list, setList] = useState<FormDocument[]>(data);

  useEffect(() => {
    handleFacilityDocumentListChanged(list);
  }, [list]);

  if(!mutateUpload) {
    console.log('mutateUpload funciton is not provided for FormFieldDocumentList');
    return null
  }

  return (
    <FormDocumentList
      handleDescriptionChanged={(fileId, description) => {
        setList(
          list.map((el) => (fileId === el.id ? { ...el, description } : el))
        );
      }}
      handleRemoveDocument={(fileId) => {
        setList(list.filter((el) => el.id !== fileId));
      }}
      handleFileSelectionSubmit={(fileList) => {
        setList([...list, {
          id: fileList[0].id,
          name: fileList[0].name,
          type: fileList[0].type,
          description: ''
        }]);
      }}
      handleFileListChanged={noop}
      documentList={list}
      isLoading={isLoading}
      mutateUpload={mutateUpload}
    />
  );
};
