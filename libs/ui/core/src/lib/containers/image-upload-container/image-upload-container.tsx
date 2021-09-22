import ImageUpload from '../../components/image-upload/image-upload';
import React from 'react';
import { useImageUploadContainerEffects } from './image-upload-container.effects';
import { Box, Grid, Typography } from '@material-ui/core';
import ImageItem from '../../components/image-item/image-item';
import { useTranslation } from 'react-i18next';
import exampleImg from './example.png';
import ProcessingContainer from '../processing-container/processing-container';

/* eslint-disable-next-line */
export interface ImageUploadContainerProps {
  uploadSuccessMsg?: string;
  uploadErrorMsg?: string;
  helpBoxText?: string;
  handleUploadSuccess: (fileList: string[]) => void;
  disabled?: boolean;
}

export const ImageUploadContainer = ({
  uploadSuccessMsg,
  uploadErrorMsg,
  helpBoxText,
  handleUploadSuccess,
  disabled,
}: ImageUploadContainerProps) => {
  const {
    isProcessingUpload,
    imageList,
    fileValidationErrorHandler,
    onDropHandler,
  } = useImageUploadContainerEffects(
    handleUploadSuccess,
    uploadSuccessMsg,
    uploadErrorMsg
  );
  const { t } = useTranslation();
  return (
    <Box width={'100%'}>
      <Grid container width={'100%'} alignItems={'stretch'}>
        <Grid item xs={12} sm={9}>
          <Typography fontWeight={700} fontSize={20} color={'primary'}>
            Images ( {imageList.length} / 16 )
          </Typography>
          {helpBoxText && (
            <Typography
              letterSpacing={'0.09px'}
              lineHeight={'24px'}
              color={'primary'}
              mb={2}
              fontSize={'16px'}
              fontWeight={500}
            >
              {helpBoxText}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          display={'flex'}
          alignItems={'flex-end'}
          mb={2}
        >
          <Typography
            lineHeight={'24px'}
            fontSize={'16px'}
            color={'primary'}
            fontWeight={700}
          >
            Examples of pictures
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexWrap={'nowrap'} maxHeight={'100%'} columnGap={1}>
          <Grid item xs={12} sm={9}>
            <ProcessingContainer isProcessing={isProcessingUpload}>
              <ImageUpload
                handleOnDrop={onDropHandler}
                handleFileValidationError={fileValidationErrorHandler}
              />
            </ProcessingContainer>
            <Typography
              mt={2}
              fontWeight={600}
              color={'primary'}
              textAlign={'center'}
              fontSize={'16px'}
              lineHeight={'20px'}
            >
              A JPG or PNG image must not be more than 4,000 pixels wide high,
              and its file size must be less than 5MB.
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <ImageItem src={exampleImg} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageUploadContainer;
