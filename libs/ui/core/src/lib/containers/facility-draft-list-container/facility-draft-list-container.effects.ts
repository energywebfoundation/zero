import { useSelector } from 'react-redux';
import {
  authStateSelectors,
  userDraftListStateSelectors,
  userdraftListStateSlice,
} from '@energyweb/zero-ui-store';
import { useUsersDraftsControllerFindAll } from '@energyweb/zero-api-client';
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
