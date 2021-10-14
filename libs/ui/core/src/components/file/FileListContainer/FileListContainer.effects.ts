import {
  useUsersControllerMe,
  useUsersControllerGetAllUserFilesMetadata
} from '@energyweb/zero-api-client';
import { FormDocument } from '../../form';

export const useFileListContainerEffects = () => {
  const { data: user } = useUsersControllerMe();
  const authenticatedUserId = user!.id;
  const { data, isFetched } =
    useUsersControllerGetAllUserFilesMetadata(authenticatedUserId, {
      query: { enabled: Boolean(authenticatedUserId) },
    });

  const files: FormDocument[] = data?.map(file => ({
    id: file.id,
    name: file.filename,
    type: file.mimetype,
  })) || [];

  return {
    files,
    isFetched,
    isProcessing: false,
    handleDeleteRequest: (filename: string) => {console.log('delete ' + filename)},
  };
};
