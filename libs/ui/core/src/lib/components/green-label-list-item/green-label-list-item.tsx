import GreenLabelForm, {
  GreenLabelDto,
  GreenLabelTypeEnum,
} from '../green-label-form/green-label-form';
import { Box, Grid, IconButton } from '@material-ui/core';
import FileUploadContainer from '../../containers/file-upload-container/file-upload-container';
import { noop } from 'lodash';
import FileInfo from '../file-info/file-info';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

export interface GreenLabelListItemProps {
  data: GreenLabelDto;
  handleUpdateGreenLabel: (
    greenLabelType: GreenLabelTypeEnum,
    greenLabel: GreenLabelDto
  ) => void;
  handleDeleteGreenLabel: (greenLabelType: GreenLabelTypeEnum) => void;
}

const GreenLabelListItem = ({
  data,
  handleUpdateGreenLabel,
  handleDeleteGreenLabel,
}: GreenLabelListItemProps) => (
  <Grid
    container
    flexWrap={'nowrap'}
    justifyContent={'space-between'}
    columnGap={2}
  >
    <Grid item sm={3}>
      <Box mr={1}>
        <GreenLabelForm
          data={data.type}
          readOnly
          submitHandler={async () => {console.log('submitHandler')}}
        />
      </Box>
    </Grid>
    <Grid
      display={'flex'}
      item
      sm={8}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box width={'90%'}>
        {!data.proofDocumentId ? (
          <FileUploadContainer
            handleSubmitSelection={(fileIdList) => {
              handleUpdateGreenLabel(data.type, {
                ...data,
                proofDocumentId: fileIdList?.[0],
              });
            }}
            handleFileListChanged={noop}
            selectOnUploaded
            withFileList
            fullWidth
          />
        ) : (
          <FileInfo id={data.proofDocumentId} />
        )}
      </Box>
      <IconButton
        onClick={() => handleDeleteGreenLabel(data.type)}
        sx={{
          mx: 3,
          backgroundColor: '#fff',
          color: 'primary.main',
          fontWeight: 700,
          '&:hover': {
            color: '#fff',
          },
        }}
      >
        <HighlightOffOutlinedIcon color={'error'} />
      </IconButton>
    </Grid>
  </Grid>
);

export default GreenLabelListItem;
