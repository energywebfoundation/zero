import {
  UploadFileDto,
  useFilesControllerUploadFiles,
} from '@energyweb/zero-ui-api';

export const useFileUploadContainerEffects = (
  uploadCompletedSuccessfullyMessage1: string | undefined,
  uploadErrorMessage: string | undefined,
  handleSubmitSelection: (fileIdList: string[]) => void,
  handleFileListChanged: (fileIdList: string[]) => void,
  selectOnUploaded: boolean | undefined
) => {
  const { mutateAsync, isLoading } = useFilesControllerUploadFiles();
  const submitHandler = ({ file }: UploadFileDto) =>
    mutateAsync({
      data: { file },
    });
  return {
    isProcessing: isLoading,
    acceptedListChangedHandler: (files: File[]) => {
      Promise.all(
        files.map((file) =>
          submitHandler({ file }).then((value) => {
            return value;
          })
        )
      ).then((value) => {
        handleFileListChanged(value as string[]);
        if (selectOnUploaded) {
          console.log(value, '!!!');
          handleSubmitSelection(value as string[]);
        }
      });
    },
  };
};
