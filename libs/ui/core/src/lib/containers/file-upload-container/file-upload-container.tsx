import FileUpload from '../../components/file-upload/file-upload';
import { useFileUploadContainerEffects } from './file-upload-container.effects';

/* eslint-disable-next-line */
export interface FileUploadContainerProps {
  title?: string;
  fullWidth?: boolean;
  withFileList?: boolean;
  selectOnUploaded?: boolean;
  handleSubmitSelection: (fileIdList: string[]) => void;
  handleFileListChanged: (fileIdList: string[]) => void;
  uploadCompletedSuccessfullyMessage?: string;
  uploadErrorMessage?: string;
}

export const FileUploadContainer = ({
  title,
  withFileList,
  selectOnUploaded,
  handleFileListChanged,
  handleSubmitSelection,
  uploadCompletedSuccessfullyMessage,
  uploadErrorMessage,
}: FileUploadContainerProps) => {
  const { acceptedListChangedHandler, isProcessing } =
    useFileUploadContainerEffects(
      uploadCompletedSuccessfullyMessage,
      uploadErrorMessage,
      handleSubmitSelection,
      handleFileListChanged,
      selectOnUploaded
    );

  return (
    <FileUpload
      isProcessing={isProcessing}
      handleSubmitSelection={handleSubmitSelection}
      withFileList={withFileList}
      title={title}
      handleAcceptedFilesChange={acceptedListChangedHandler}
    />
  );
};

export default FileUploadContainer;
