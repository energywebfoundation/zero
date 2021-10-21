import { ImageList } from '@energyweb/zero-ui-core';
import { Box, Paper } from '@material-ui/core';
import { FC } from 'react';
import { useImageListContainerEffects } from './ImageListContainer.effects';

export interface ImageListContainerProps {
  fieldName: string;
}

export const ImageListContainer: FC<ImageListContainerProps> = ({ fieldName }) => {
  const { imagesUrls } = useImageListContainerEffects(fieldName);

  return (
    <>
    {imagesUrls.length ?
      <Box my={2}>
        <Paper sx={{ p: 3 }}>
          <ImageList
            // mock
            fileDeleteHandler={(fileId) => { console.log(fileId) }}
            imageList={imagesUrls}
          />
        </Paper>
      </Box>
      : null
    }
    </>
  );
};
