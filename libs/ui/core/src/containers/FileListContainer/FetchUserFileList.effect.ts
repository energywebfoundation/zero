import { useUsersControllerMe, useUsersFilesControllerGetUserFilesMetadata } from '@energyweb/zero-api-client';
import { useEffect } from 'react';

export const useFetchUserFileListEffect = () => {
  const { data: user } = useUsersControllerMe();
  const authenticatedUserId = user!.id;
  const { data, isFetching, isFetched } =
    useUsersFilesControllerGetUserFilesMetadata(authenticatedUserId, {
      query: { enabled: Boolean(authenticatedUserId) },
    });
  useEffect(() => {
    if (isFetched) {
      // dispatch(userFileListStateActions.userFileListFetched(data));
    }
  }, [data, isFetched]);
  return { data, isFetched, isFetching };
};
