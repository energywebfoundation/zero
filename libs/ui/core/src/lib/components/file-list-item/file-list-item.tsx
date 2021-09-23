import styled from '@emotion/styled';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
import Grid from '@material-ui/core/Grid';
import FileInfo from '../file-info/file-info';
import { Box } from '@material-ui/core';

/* eslint-disable-next-line */
export interface FileListItemProps {
  data: FileMetadataDto;
  selected?: boolean;
  handleDeleteRequest?: (id: string) => void;
}

const StyledFileListItem = styled(Box)`
  width: 100%;
  padding: 10px;
`;

export const FileListItem = ({
  data,
  selected,
  handleDeleteRequest,
}: FileListItemProps) => (
  <StyledFileListItem
    bgcolor={selected ? 'secondary.main' : undefined}
    sx={{ '&:hover': { backgroundColor: 'secondary.light' } }}
  >
    <Grid container>
      <Grid item sm={12}>
        <Box
          sx={{ cursor: 'pointer' }}
          display={'flex'}
          justifyContent={'center'}
          alignContent={'center'}
        >
          <FileInfo
            selected
            handleDeleteRequest={handleDeleteRequest}
            id={data.id}
          />
        </Box>
      </Grid>
    </Grid>
  </StyledFileListItem>
);

export default FileListItem;
