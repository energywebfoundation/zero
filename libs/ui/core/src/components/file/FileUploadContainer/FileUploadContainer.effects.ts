import { UseMutateAsyncFunction } from 'react-query';

export interface UploadFile {
  file: Blob;
};

export interface UploadFileResponse {
  id?: string;
};

export interface StoredFile {
  id: string;
  name: string;
  type: string;
}

export const useFileUploadContainerEffects = (
  uploadCompletedSuccessfullyMessage1: string | undefined,
  uploadErrorMessage: string | undefined,
  handleSubmitSelection: (fileIdList: StoredFile[]) => void,
  handleFileListChanged: (fileIdList: StoredFile[]) => void,
  selectOnUploaded: boolean | undefined,
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>,
) => {
  const submitHandler = ({ file }: UploadFile) =>
    mutateUpload({
      data: { file },
    });
  return {
    acceptedListChangedHandler: (files: File[]) => {
      Promise.all(
        files.map((file) =>
          submitHandler({ file }).then((value) => {
            return { id: `${value.id}`, name: file.name, type: file.type } as StoredFile;
          })
        )
      ).then((value) => {
        handleFileListChanged(value);
        if (selectOnUploaded) {
          handleSubmitSelection(value);
        }
      });
    },
  };
};
