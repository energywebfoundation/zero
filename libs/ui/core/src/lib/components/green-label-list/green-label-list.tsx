import styled from '@emotion/styled';
import { Box, Grid, IconButton } from '@material-ui/core';
import React, { FC } from 'react';
import GreenLabelForm, {
  GreenLabelDto,
  GreenLabelTypeEnum,
} from '../green-label-form/green-label-form';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import FileUploadContainer from '../../containers/file-upload-container/file-upload-container';
import FileInfo, { FileTypeEnum } from '../file-info/file-info';

/* eslint-disable-next-line */
export interface GreenLabelListProps {
  greenLabelList: ReadonlyArray<GreenLabelDto>;
  handleAddNewGreenLabel: (newGreenLabel: GreenLabelDto) => void;
  handleDeleteGreenLabel: (greenLabelType: GreenLabelTypeEnum) => void;
  handleUpdateGreenLabel: (
    greenLabelType: GreenLabelTypeEnum,
    greenLabel: GreenLabelDto
  ) => void;
}

const StyledGreenLabelList = styled.div``;

const RowTemplate: FC<{
  data: GreenLabelDto;
  handleUpdateGreenLabel: (
    greenLabelType: GreenLabelTypeEnum,
    greenLabel: GreenLabelDto
  ) => void;
  handleDeleteGreenLabel: (greenLabelType: GreenLabelTypeEnum) => void;
}> = ({ data, handleUpdateGreenLabel, handleDeleteGreenLabel }) => (
  <Grid container flexWrap={'nowrap'} columnGap={2}>
    <Grid item sm={4}>
      <GreenLabelForm
        data={data.type}
        readOnly
        submitHandler={async (values, resetForm) => {}}
      />
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
            handleFileListChanged={() => {}}
            selectOnUploaded
            withFileList
            fullWidth
          />
        ) : (
          <FileInfo
            fileType={FileTypeEnum.PDF}
            filename={data.proofDocumentId}
          />
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

export const GreenLabelList = ({
  greenLabelList = [],
  handleAddNewGreenLabel,
  handleUpdateGreenLabel,
  handleDeleteGreenLabel,
}: GreenLabelListProps) => {
  return (
    <StyledGreenLabelList>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            {greenLabelList.map((data, index) => (
              <Box key={index}>
                <RowTemplate
                  handleDeleteGreenLabel={handleDeleteGreenLabel}
                  handleUpdateGreenLabel={handleUpdateGreenLabel}
                  data={data}
                />
              </Box>
            ))}
            <Box>
              <GreenLabelForm
                submitHandler={async (values, resetForm) => {
                  handleAddNewGreenLabel({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    type: values.greenLabel,
                    description: null,
                    proofDocumentId: null,
                  });
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StyledGreenLabelList>
  );
};

export default GreenLabelList;
