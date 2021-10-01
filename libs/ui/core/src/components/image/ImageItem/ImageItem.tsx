import { Box } from '@material-ui/core';
import { ImagePlaceholderDark, ImagePlaceholderLight } from '@energyweb/zero-ui-assets';
import { ProcessingContainer } from '../../layout';

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
        bgcolor={showLightPlaceholder ? '#F6EFFF' : 'primary'}
        maxHeight={setImgMaxHeightTo}
        alignContent={'center'}
        display={'flex'}
      >
        {showLightPlaceholder && (
          <ImagePlaceholderLight />
        )}
        {showDarkPlaceholder && (
          <ImagePlaceholderDark />
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
