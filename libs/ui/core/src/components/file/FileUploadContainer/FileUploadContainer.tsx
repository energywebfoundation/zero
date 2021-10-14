import { UseMutateAsyncFunction } from 'react-query';
import { FileUpload } from '../FileUpload';
import { StoredFile, UploadFile, UploadFileResponse, useFileUploadContainerEffects } from './FileUploadContainer.effects';

export interface FileUploadContainerProps {
  title?: string;
  fullWidth?: boolean;
  withFileList?: boolean;
  selectOnUploaded?: boolean;
  handleSubmitSelection: (fileIdList: StoredFile[]) => void;
  handleFileListChanged: (fileIdList: StoredFile[]) => void;
  uploadCompletedSuccessfullyMessage?: string;
  uploadErrorMessage?: string;
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>,
  isLoading?: boolean;
}

export const FileUploadContainer = ({
  title,
  withFileList,
  selectOnUploaded,
  handleFileListChanged,
  handleSubmitSelection,
  uploadCompletedSuccessfullyMessage,
  uploadErrorMessage,
  mutateUpload,
  isLoading = false
}: FileUploadContainerProps) => {
  const { acceptedListChangedHandler } =
    useFileUploadContainerEffects(
      uploadCompletedSuccessfullyMessage,
      uploadErrorMessage,
      handleSubmitSelection,
      handleFileListChanged,
      selectOnUploaded,
      mutateUpload
    );

  return (
    <FileUpload
      isProcessing={isLoading}
      handleSubmitSelection={handleSubmitSelection}
      withFileList={withFileList}
      title={title}
      handleAcceptedFilesChange={acceptedListChangedHandler}
    />
  );
};
