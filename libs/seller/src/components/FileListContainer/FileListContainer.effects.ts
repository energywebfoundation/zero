import {
  useUsersControllerMe,
  useUsersFilesControllerGetUserFilesMetadata
} from '@energyweb/zero-api-client';

export const useFileListContainerEffects = () => {
  const { data: user } = useUsersControllerMe();
  const authenticatedUserId = user!.id;
  const { data, isFetched } =
    useUsersFilesControllerGetUserFilesMetadata(authenticatedUserId, {
      query: { enabled: Boolean(authenticatedUserId) },
    });

  return {
    userFileList: { data, isFetched },
    isProcessing: false,
    handleDeleteRequest: (filename: string) => {console.log('handleDeleteRequest')},
  };
};
