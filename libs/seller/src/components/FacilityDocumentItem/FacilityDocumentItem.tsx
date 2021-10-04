import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { IconButton, TextField } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { FileInfo } from '@energyweb/zero-ui-core';

export interface FacilityDocument {
  id: string;
  description?: string;
}

export interface FacilityDocumentItemProps {
  id: string;
  description?: string;
  handleDescriptionChange: (fileId: string, descrition: string) => void;
  handleRemoveDocumentItem: (fileId: string) => void;
}

const StyledDiv = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
`;

export const FacilityDocumentItem = ({
  description,
  id,
  handleDescriptionChange,
  handleRemoveDocumentItem,
}: FacilityDocumentItemProps) => (
  <StyledDiv>
    <Grid container flexWrap={'nowrap'} columnGap={2}>
      <Grid
        display={'flex'}
        item
        sm={6}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <FileInfo id={id} />
      </Grid>
      <Grid item sm={6} display={'flex'} justifyContent={'space-between'}>
        <TextField
          fullWidth
          onChange={(event) => {
            handleDescriptionChange(id, event.target.value);
          }}
          value={description || ''}
          label={'Optional description'}
        />
        <IconButton
          onClick={() => handleRemoveDocumentItem(id)}
          sx={{
            ml: 2,
            mr: 3,
            backgroundColor: '#fff',
            color: 'primary.main',
            '&:hover': {
              color: '#fff',
            },
          }}
        >
          {' '}
          <HighlightOffOutlinedIcon color={'error'} />
        </IconButton>
      </Grid>
    </Grid>
  </StyledDiv>
);
