import styled from '@emotion/styled';
import { UseMutateAsyncFunction } from 'react-query';
import { GenericFormFieldConfig } from '../../../containers';
import { FileUpload, StoredFile, UploadFile, UploadFileResponse } from '../../file';
import { FormDocument, FormDocumentItem } from '../FormDocumentItem';

export interface FormDocumentListProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  >;
  documentList: FormDocument[];
  handleFileListChanged: (fileIdList: StoredFile[]) => void;
  handleFileSelectionSubmit: (fileIdList: string) => Promise<void>;
  handleRemoveDocument: (fileId: string) => void;
  handleDescriptionChanged: (fileId: string, description: string) => void;
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>;
  isLoading?: boolean;
}

const StyledDiv = styled.div`
  flex-grow: 1;
`;

export const FormDocumentList = ({
  field,
  documentList = [],
  handleFileListChanged,
  handleFileSelectionSubmit,
  handleDescriptionChanged,
  handleRemoveDocument,
  mutateUpload,
  isLoading
}: FormDocumentListProps) => {
  return (
    <StyledDiv>
      {documentList.map((document) => (
        <FormDocumentItem
          key={document.id}
          handleRemoveDocumentItem={handleRemoveDocument}
          handleDescriptionChange={handleDescriptionChanged}
          document={document}
        />
      ))}
      <FileUpload
        withFileList
        selectOnUploaded
        title={field.label || 'Add document'}
        handleSubmitSelection={handleFileSelectionSubmit}
        handleFileListChanged={handleFileListChanged}
        isProcessing={isLoading}
        mutateUpload={mutateUpload}
      />
    </StyledDiv>
  );
};
