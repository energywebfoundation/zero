import { useUsersDraftsControllerFindAll } from '@energyweb/zero-ui-api';
import { useSelector } from 'react-redux';
import { authStateSelectors } from '@energy-web-zero/store-configure';
import { useEffect } from 'react';
import { userdraftListStateSlice } from '@energy-web-zero/store-configure';

export const useFacilityDraftListPageEffects = () => {
  const authenticatedUserId = useSelector(
    authStateSelectors.authenticatedUserId
  );
  const { data, isFetched } = useUsersDraftsControllerFindAll(
    authenticatedUserId!
  );
  useEffect(() => {
    if (isFetched) {
      userdraftListStateSlice.actions.userDraftListFetched(data);
    }
  }, [data, isFetched]);
};
