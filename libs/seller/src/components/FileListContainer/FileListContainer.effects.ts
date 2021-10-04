import {
  useUsersControllerMe,
  useUsersControllerGetAllUserFilesMetadata
} from '@energyweb/zero-api-client';

export const useFileListContainerEffects = () => {
  const { data: user } = useUsersControllerMe();
  const authenticatedUserId = user!.id;
  const { data, isFetched } =
    useUsersControllerGetAllUserFilesMetadata(authenticatedUserId, {
      query: { enabled: Boolean(authenticatedUserId) },
    });

  return {
    userFileList: { data, isFetched },
    isProcessing: false,
    handleDeleteRequest: (filename: string) => {console.log('handleDeleteRequest')},
  };
};
