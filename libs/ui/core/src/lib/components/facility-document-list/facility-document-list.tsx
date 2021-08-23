import styled from '@emotion/styled';
import FacilityDocumentItem, {
  FacilityDocumentDto,
} from '../facility-document-item/facility-document-item';
import FileUploadContainer from '../../containers/file-upload-container/file-upload-container';

/* eslint-disable-next-line */
export interface FacilityDocumentListProps {
  documentList: FacilityDocumentDto[];
  handleFileListChanged: (fileIdList: string[]) => void;
  handleFileSelectionSubmit: (fileIdList: string[]) => void;
  handleRemoveFacilityDocument: (fileId: string) => void;
  handleDescriptionChanged: (fileId: string, description: string) => void;
}

const StyledFacilityDocumentList = styled.div`
  flex-grow: 1;
`;

export const FacilityDocumentList = ({
  documentList = [],
  handleFileListChanged,
  handleFileSelectionSubmit,
  handleDescriptionChanged,
  handleRemoveFacilityDocument,
}: FacilityDocumentListProps) => {
  return (
    <StyledFacilityDocumentList>
      {documentList.map(({ id, description }, index) => (
        <FacilityDocumentItem
          handleRemoveDocumentItem={handleRemoveFacilityDocument}
          handleDescriptionChange={handleDescriptionChanged}
          id={id}
          description={description}
          key={index}
        />
      ))}
      <FileUploadContainer
        handleSubmitSelection={handleFileSelectionSubmit}
        handleFileListChanged={handleFileListChanged}
        selectOnUploaded
        withFileList
        fullWidth
        title={'Add document'}
      />
    </StyledFacilityDocumentList>
  );
};

export default FacilityDocumentList;
