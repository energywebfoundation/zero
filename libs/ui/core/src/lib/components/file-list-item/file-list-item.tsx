import styled from '@emotion/styled';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';
import FileInfo, { FileTypeEnum } from '../file-info/file-info';
import { Box, Button } from '@material-ui/core';

/* eslint-disable-next-line */
export interface FileListItemProps {
  data: FileMetadataDto;
  selected?: boolean;
}

const StyledFileListItem = styled(Box)`
  width: 100%;
  padding: 10px;
`;

export const FileListItem = ({ data, selected }: FileListItemProps) => (
  <StyledFileListItem
    bgcolor={selected ? 'secondary.main' : undefined}
    sx={{ '&:hover': { backgroundColor: 'secondary.light' } }}
  >
    <Grid container>
      <Grid item sm={6}>
        <Box display={'flex'}>
          <FileInfo fileType={FileTypeEnum.PDF} filename={data.filename} />
        </Box>
      </Grid>
      <Grid item sm={4} />
      <Grid item sm={2}>
        {dayjs(String(data.uploadedAt)).format('DD/MM/YYYY HH:mm')}
      </Grid>
    </Grid>
  </StyledFileListItem>
);

export default FileListItem;
