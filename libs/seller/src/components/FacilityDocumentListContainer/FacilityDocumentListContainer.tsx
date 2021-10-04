import { useEffect, useState } from 'react';
import { noop } from 'lodash';
import { FacilityDocument } from '../FacilityDocumentItem';
import { FacilityDocumentList } from '../FacilityDocumentList';

export interface FacilityDocumentListContainerProps {
  data: FacilityDocument[];
  handleFacilityDocumentListChanged: (
    facilityDocumentList: FacilityDocument[]
  ) => void;
}

export const FacilityDocumentListContainer = ({
  handleFacilityDocumentListChanged,
  data,
}: FacilityDocumentListContainerProps) => {
  const [list, setList] = useState<FacilityDocument[]>(data);
  useEffect(() => {
    handleFacilityDocumentListChanged(list);
  }, [list]);
  return (
    <FacilityDocumentList
      handleDescriptionChanged={(fileId, description) => {
        setList(
          list.map((el) => (fileId === el.id ? { ...el, description } : el))
        );
      }}
      handleRemoveFacilityDocument={(fileId) => {
        setList(list.filter((el) => el.id !== fileId));
      }}
      handleFileSelectionSubmit={(fileIdList) => {
        setList([...list, { id: fileIdList[0], description: '' }]);
      }}
      handleFileListChanged={noop}
      documentList={list}
    />
  );
};
