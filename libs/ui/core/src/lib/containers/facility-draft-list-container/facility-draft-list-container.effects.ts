import { useSelector } from 'react-redux';
import {
  authStateSelectors,
  userDraftListStateSelectors,
  userdraftListStateSlice,
} from '@energy-web-zero/store';
import { useUsersDraftsControllerFindAll } from '@energy-web-zero/api-client';
import { useEffect } from 'react';

export const useFacilityDraftListContainerEffects = () => {
  const authenticatedUserId = useSelector(
    authStateSelectors.authenticatedUserId
  );
  const { data, isFetched, isSuccess } = useUsersDraftsControllerFindAll(
    authenticatedUserId!
  );
  useEffect(() => {
    if (isFetched && isSuccess && data) {
      userdraftListStateSlice.actions.userDraftListFetched(data);
    }
  }, [data, isFetched]);

  return {
    selectors: {
      userFacilityDraftList: useSelector(userDraftListStateSelectors.list),
    },
  };
};
