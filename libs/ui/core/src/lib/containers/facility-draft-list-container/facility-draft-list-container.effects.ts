import { useSelector } from 'react-redux';
import {
  authStateSelectors,
  userDraftListStateSelectors,
  userdraftListStateSlice,
} from '@energy-web-zero/store-configure';
import { useUsersDraftsControllerFindAll } from '@energyweb/zero-ui-api';
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
