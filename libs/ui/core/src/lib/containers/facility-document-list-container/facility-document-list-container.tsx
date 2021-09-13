import FacilityDocumentList from '../../components/facility-document-list/facility-document-list';
import React, { useEffect, useState } from 'react';
import { FacilityDocumentDto } from '../../components/facility-document-item/facility-document-item';

/* eslint-disable-next-line */
export interface FacilityDocumentListContainerProps {
  handleFacilityDocumentListChanged: (
    facilityDocumentList: FacilityDocumentDto[]
  ) => void;
}

export const FacilityDocumentListContainer = ({
  handleFacilityDocumentListChanged,
}: FacilityDocumentListContainerProps) => {
  const [list, setList] = useState<FacilityDocumentDto[]>([]);
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
      handleFileListChanged={(fileIdList) => {}}
      documentList={list}
    />
  );
};

export default FacilityDocumentListContainer;
