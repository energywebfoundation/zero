import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ProcessingContainer } from '../../layout';
import { ImageItem } from '../ImageItem';
import { ImageUpload } from '../ImageUpload';
import exampleImg from './example.png';
import { useImageUploadContainerEffects } from './ImageUploadContainer.effects';

export interface ImageUploadContainerProps {
  handleUploadSuccess: (fileList: string[]) => void;
  title?: string;
  subtitle?: string;
}

export const ImageUploadContainer = ({
  handleUploadSuccess,
  title,
  subtitle
}: ImageUploadContainerProps) => {
  const { t } = useTranslation();
  const {
    isProcessingUpload,
    fileValidationErrorHandler,
    onDropHandler,
  } = useImageUploadContainerEffects(handleUploadSuccess);

  return (
    <Box width={'100%'}>
      <Grid container width={'100%'} alignItems={'stretch'}>
        <Grid item xs={12} sm={9}>
          {title &&
          <Typography fontWeight={700} fontSize={20} color={'primary'}>
            {title}
          </Typography>
          }
          {subtitle && (
            <Typography
              color={'primary'}
              my={2}
              fontWeight={500}
            >
              {subtitle}
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
            {t('images.examples')}
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
              {t('components.ImageUploadContainer.helpText')}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <ImageItem fileId={exampleImg} src={exampleImg} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
