import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import FileInfo from '../file-info/file-info';
import { IconButton, TextField } from '@material-ui/core';
import React from 'react';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

export interface FacilityDocumentDto {
  id: string;
  description?: string;
}

/* eslint-disable-next-line */
export interface FacilityDocumentItemProps {
  id: string;
  description?: string;
  handleDescriptionChange: (fileId: string, descrition: string) => void;
  handleRemoveDocumentItem: (fileId: string) => void;
}

const StyledFacilityDocumentItem = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
`;

export const FacilityDocumentItem = ({
  description,
  id,
  handleDescriptionChange,
  handleRemoveDocumentItem,
}: FacilityDocumentItemProps) => (
  <StyledFacilityDocumentItem>
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
  </StyledFacilityDocumentItem>
);

export default FacilityDocumentItem;
