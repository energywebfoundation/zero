import styled from '@emotion/styled';
import { FileMetadataDto } from '@energyweb/zero-api-client';
import { Box, Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FileListItem from '../FileListItem/FileListItem';

export interface FileListProps {
  selectable?: boolean;
  loading: boolean;
  fileList: Array<FileMetadataDto>;
  selectedFileIdList: string[];
  multiple?: boolean;
  handleDeleteRequest?: (id: string) => void;
  handleSelectionChange: (id: string) => void;
  handleSubmit: (fileIdList: string[]) => void;
  handleCancel: () => void;
}

const StyledFileList = styled.div`
  width: 100%;
`;

export const FileList = ({
  fileList,
  selectedFileIdList,
  handleSelectionChange,
  handleSubmit,
  handleCancel,
  handleDeleteRequest,
  selectable,
}: FileListProps) => {
  const { t } = useTranslation();
  return (
    <StyledFileList>
      <Grid container>
        {fileList.map((data, index) => (
          <Grid
            item
            xs={6}
            key={data.id}
            onClick={() => selectable && handleSelectionChange(data.id)}
          >
            <FileListItem
              handleDeleteRequest={handleDeleteRequest}
              selected={selectedFileIdList.includes(data.id)}
              key={index}
              data={data}
            />
          </Grid>
        ))}
      </Grid>
      {selectable && (
        <Box p={3}>
          <Button
            disabled={!selectedFileIdList.length}
            sx={{ mr: 3 }}
            variant={'contained'}
            onClick={() => {
              handleSubmit(selectedFileIdList);
            }}
          >
            {t('components.FileList.submitSelection')}
          </Button>
          <Button
            color={'warning'}
            variant={'contained'}
            onClick={handleCancel}
          >
            {t('components.FileList.cancel')}
          </Button>
        </Box>
      )}
    </StyledFileList>
  );
};

export default FileList;
