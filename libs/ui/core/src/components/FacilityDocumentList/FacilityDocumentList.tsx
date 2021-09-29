import styled from '@emotion/styled';
import FacilityDocumentItem, {
  FacilityDocument,
} from '../FacilityDocumentItem/FacilityDocumentItem';
import FileUploadContainer from '../../containers/FileUploadContainer/FileUploadContainer';

export interface FacilityDocumentListProps {
  documentList: FacilityDocument[];
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
