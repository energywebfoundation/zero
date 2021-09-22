import FacilityDocumentList from '../../components/facility-document-list/facility-document-list';
import React, { useEffect, useState } from 'react';
import { FacilityDocumentDto } from '../../components';
import { noop } from 'lodash';

/* eslint-disable-next-line */
export interface FacilityDocumentListContainerProps {
  data: FacilityDocumentDto[];
  handleFacilityDocumentListChanged: (
    facilityDocumentList: FacilityDocumentDto[]
  ) => void;
}

export const FacilityDocumentListContainer = ({
  handleFacilityDocumentListChanged,
  data,
}: FacilityDocumentListContainerProps) => {
  const [list, setList] = useState<FacilityDocumentDto[]>(data);
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

export default FacilityDocumentListContainer;
