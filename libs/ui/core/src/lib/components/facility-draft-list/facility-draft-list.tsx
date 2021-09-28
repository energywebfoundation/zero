import { List, ListItem } from '@material-ui/core';
import { DraftDto } from '@energyweb/zero-api-client';

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
