import styled from '@emotion/styled';
import { UseMutateAsyncFunction } from 'react-query';
import { FileUploadContainer, StoredFile, UploadFile, UploadFileResponse } from '../../file';
import { FormDocument, FormDocumentItem } from '../FormDocumentItem';

export interface FormDocumentListProps {
  documentList: FormDocument[];
  handleFileListChanged: (fileIdList: StoredFile[]) => void;
  handleFileSelectionSubmit: (fileIdList: StoredFile[]) => void;
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
      <FileUploadContainer
        fullWidth
        withFileList
        selectOnUploaded
        title='Add document'
        handleSubmitSelection={handleFileSelectionSubmit}
        handleFileListChanged={handleFileListChanged}
        isLoading={isLoading}
        mutateUpload={mutateUpload}
      />
    </StyledDiv>
  );
};
