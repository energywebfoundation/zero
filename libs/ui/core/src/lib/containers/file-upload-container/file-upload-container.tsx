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
}

export const FileUploadContainer = ({
  title,
  withFileList,
  fullWidth,
  selectOnUploaded,
  handleFileListChanged,
  handleSubmitSelection,
}: FileUploadContainerProps) => {
  const { submitHandler } = useFileUploadContainerEffects();

  return (
    <FileUpload
      handleSubmitSelection={handleSubmitSelection}
      withFileList={withFileList}
      title={title}
      handleAcceptedFilesChange={(files) => {
        Promise.all(
          files.map((file) =>
            submitHandler({ file }).then((value) => {
              return value;
            })
          )
        ).then((value) => {
          handleFileListChanged(value as string[]);
          if (selectOnUploaded) {
            handleSubmitSelection(value as string[]);
          }
        });
      }}
    />
  );
};

export default FileUploadContainer;
