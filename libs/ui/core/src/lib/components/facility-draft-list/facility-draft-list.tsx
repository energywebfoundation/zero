import { List, ListItem } from '@material-ui/core';
import { DraftDto } from '@energy-web-zero/api-client';
import { FacilityDraft } from '@energy-web-zero/seller';

/* eslint-disable-next-line */
export interface FacilityDraftListProps {
  data: DraftDto[];
}

export const FacilityDraftList = ({ data }: FacilityDraftListProps) => {
  return (
    <List>
      <ListItem />
      TODO
    </List>
  );
};

export default FacilityDraftList;
