import FacilityDraftList from '../../components/facility-draft-list/facility-draft-list';
import { useFacilityDraftListContainerEffects } from './facility-draft-list-container.effects';
import { FC } from 'react';

/* eslint-disable-next-line */
export interface FacilityDraftListContainerProps {}

export const FacilityDraftListContainer: FC<FacilityDraftListContainerProps> =
  () => {
    const { selectors } = useFacilityDraftListContainerEffects();
    return <FacilityDraftList data={selectors.userFacilityDraftList} />;
  };

export default FacilityDraftListContainer;
