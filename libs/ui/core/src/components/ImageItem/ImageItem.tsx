import lightPlaceholder from './placeholder-light.svg';
import darkPlaceholder from './placeholder-dark.svg';
import ProcessingContainer from '../../containers/ProcessingContainer/ProcessingContainer';
import { Box } from '@material-ui/core';

export interface ImageItemProps {
  isProcessing?: boolean;
  src?: string;
  alt?: string;
  showDarkPlaceholder?: boolean;
  showLightPlaceholder?: boolean;
  setImgMaxHeightTo?: string;
}

export const ImageItem = ({
  alt,
  src,
  isProcessing,
  showDarkPlaceholder,
  showLightPlaceholder,
  setImgMaxHeightTo = '184px',
}: ImageItemProps) => (
  <ProcessingContainer isProcessing={Boolean(isProcessing)}>
    {!src && (showDarkPlaceholder || showLightPlaceholder) ? (
      <Box
        borderRadius={'5px'}
        bgcolor={lightPlaceholder ? '#F6EFFF' : 'primary'}
        maxHeight={setImgMaxHeightTo}
        alignContent={'center'}
        display={'flex'}
      >
        {showLightPlaceholder && (
          <img
            alt={'light background image placeholder'}
            src={lightPlaceholder}
          />
        )}
        {showDarkPlaceholder && (
          <img
            alt={'dark background image placeholder'}
            src={darkPlaceholder}
          />
        )}
      </Box>
    ) : (
      <img
        alt={alt}
        style={{
          width: 'auto',
          maxHeight: '184px',
        }}
        src={src}
      />
    )}
  </ProcessingContainer>
);

export default ImageItem;
