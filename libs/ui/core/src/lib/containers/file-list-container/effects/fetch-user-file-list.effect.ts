import { useDispatch, useSelector } from 'react-redux';
import {
  authStateSelectors,
  userFileListStateActions,
} from '@energy-web-zero/store';
import { useUsersFilesControllerGetUserFilesMetadata } from '@energy-web-zero/api-client';
import { useEffect } from 'react';

export const useFetchUserFileListEffect = () => {
  const dispatch = useDispatch();
  const authenticatedUserId = useSelector(
    authStateSelectors.userProfileData
  )!.id;
  const { data, isFetching, isFetched } =
    useUsersFilesControllerGetUserFilesMetadata(authenticatedUserId, {
      query: { enabled: Boolean(authenticatedUserId) },
    });
  useEffect(() => {
    if (isFetched) {
      dispatch(userFileListStateActions.userFileListFetched(data));
    }
  }, [data, dispatch, isFetched]);
  return { data, isFetched, isFetching };
};
