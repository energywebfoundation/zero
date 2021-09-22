import styled from '@emotion/styled';
import FileListItem from '../file-list-item/file-list-item';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
import { Box, Button, Grid } from '@material-ui/core';
import { FileTypeEnum } from '../file-info/file-info';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FileListItemConfig extends FileMetadataDto {}

/* eslint-disable-next-line */
export interface FileListProps {
  selectable?: boolean;
  fileTypeDisplayList: Array<FileTypeEnum>;
  loading: boolean;
  fileList: Array<FileListItemConfig>;
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
  fileTypeDisplayList,
  fileList,
  selectedFileIdList,
  handleSelectionChange,
  handleSubmit,
  handleCancel,
  handleDeleteRequest,
  selectable,
}: FileListProps) => {
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
            Submit selection
          </Button>
          <Button
            color={'warning'}
            variant={'contained'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      )}
    </StyledFileList>
  );
};

export default FileList;
