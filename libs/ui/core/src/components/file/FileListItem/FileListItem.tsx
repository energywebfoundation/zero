import { FC } from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { FileInfo } from '../FileInfo';

export interface FileListItemProps {
  // was of type FileMetadataDto
  // should be handled in a more generic way
  data: any;
  selected?: boolean;
  handleDeleteRequest?: (id: string) => void;
}

const StyledBox = styled(Box)`
  width: 100%;
  padding: 10px;
`;

export const FileListItem: FC<FileListItemProps> = ({
  data,
  selected,
  handleDeleteRequest,
}) => (
  <StyledBox
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
  </StyledBox>
);
