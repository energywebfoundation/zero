import { getUsersControllerGetAllUserFilesMetadataQueryKey, getUsersControllerMeQueryKey, UserDto } from '@energyweb/zero-api-client';
import { useEffect, useState } from 'react';
import { UseMutateAsyncFunction, useQueryClient } from 'react-query';

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

export const useFileUploadEffects = (
  handleSubmitSelection: (fileIdList: string) => Promise<void>,
  handleFileListChanged: (fileIdList: StoredFile[]) => void,
  selectOnUploaded: boolean | undefined,
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>,
  acceptedFiles: File[]
) => {
  const [isFileListModalOpen, setIsFileListModalOpen] = useState(false);

  const handleAcceptedFilesChange = (files: File[]) => {
    Promise.all(
      files.map((file) =>
        submitHandler({ file }).then((value) => {
          return { id: `${value.id}`, name: file.name, type: file.type } as StoredFile;
        })
      )
    ).then((value) => {
      handleFileListChanged(value);
      queryClient.resetQueries(allUserFilesQueryKey);

      if (selectOnUploaded) handleSubmitSelection(value[0].id);
    });
  }

  useEffect(() => {
    if (acceptedFiles?.length) {
      handleAcceptedFilesChange(acceptedFiles);
    }
  }, [acceptedFiles]);

  // bad should not be here
  const queryClient = useQueryClient();
  const userQueryKey = getUsersControllerMeQueryKey();
  const user = queryClient.getQueryData(userQueryKey) as UserDto;
  const userId = user?.id;
  const allUserFilesQueryKey = getUsersControllerGetAllUserFilesMetadataQueryKey(userId);

  const submitHandler = ({ file }: UploadFile) => mutateUpload({ data: { file } });

  const handleCloseFileListModal = () => setIsFileListModalOpen(false);
  const handleOpenFileListModal = () => setIsFileListModalOpen(true);

  const handleSubmitFileSelection = (fileId: string) => {
    handleSubmitSelection(fileId);
    setIsFileListModalOpen(false);
  }

  return { handleCloseFileListModal, handleOpenFileListModal, handleSubmitFileSelection, isFileListModalOpen };
};
