import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FileInfo } from '../../file';
import { CallToActionButton } from '../../layout';

export interface FormDocument {
  id: string;
  name: string;
  type: string;
  description?: string;
}

export interface FormDocumentItemProps {
  document: FormDocument;
  handleDescriptionChange: (fileId: string, descrition: string) => void;
  handleRemoveDocumentItem: (fileId: string) => void;
}

const StyledDiv = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
`;

export const FormDocumentItem = ({
  document,
  handleDescriptionChange,
  handleRemoveDocumentItem,
}: FormDocumentItemProps) => (
  <StyledDiv>
    <Grid container flexWrap={'nowrap'} columnGap={2}>
      <Grid
        display={'flex'}
        item
        sm={6}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <FileInfo document={document} />
      </Grid>
      <Grid item sm={6} display={'flex'} justifyContent={'space-between'}>
        <TextField
          fullWidth
          onChange={(event) => {
            handleDescriptionChange(document.id, event.target.value);
          }}
          value={document.description || ''}
          label={'Optional description'}
        />
        <CallToActionButton
          translateKey="file.remove"
          onClick={() => handleRemoveDocumentItem(document.id)}
          endIcon={<Delete />}
          sx={{ ml: 2, mr: 2, minWidth: '200px' }}
        />
      </Grid>
    </Grid>
  </StyledDiv>
);
