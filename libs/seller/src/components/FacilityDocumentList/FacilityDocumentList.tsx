import styled from '@emotion/styled';
import { FacilityDocument, FacilityDocumentItem } from '../FacilityDocumentItem';
import { FileUploadContainer } from '../FileUploadContainer';

export interface FacilityDocumentListProps {
  documentList: FacilityDocument[];
  handleFileListChanged: (fileIdList: string[]) => void;
  handleFileSelectionSubmit: (fileIdList: string[]) => void;
  handleRemoveFacilityDocument: (fileId: string) => void;
  handleDescriptionChanged: (fileId: string, description: string) => void;
}

const StyledDiv = styled.div`
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
    <StyledDiv>
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
    </StyledDiv>
  );
};
