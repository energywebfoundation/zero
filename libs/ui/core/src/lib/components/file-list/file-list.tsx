import styled from '@emotion/styled';
import FileListItem from '../file-list-item/file-list-item';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
import { Box, Button, List, ListItem } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FileListItemConfig extends FileMetadataDto {}

/* eslint-disable-next-line */
export interface FileListProps {
  loading: boolean;
  fileList: Array<FileListItemConfig>;
  selectedFileIdList: string[];
  multiple?: boolean;
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
}: FileListProps) => {
  return (
    <StyledFileList>
      <List>
        {fileList.map((data, index) => (
          <ListItem
            key={data.id}
            onClick={() => handleSelectionChange(data.id)}
          >
            <FileListItem
              selected={selectedFileIdList.includes(data.id)}
              key={index}
              data={data}
            />
          </ListItem>
        ))}
      </List>
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
        <Button color={'warning'} variant={'contained'} onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </StyledFileList>
  );
};

export default FileList;
