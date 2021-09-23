import { useFacilityDraftListPageEffects } from './facility-draft-list-page.effects';
import FacilityDraftListContainer from '../../containers/facility-draft-list-container/facility-draft-list-container';

/* eslint-disable-next-line */
export interface FacilityDraftListPageProps {}

export const FacilityDraftListPage = (props: FacilityDraftListPageProps) => {
  useFacilityDraftListPageEffects();
  return <FacilityDraftListContainer />;
};

export default FacilityDraftListPage;
