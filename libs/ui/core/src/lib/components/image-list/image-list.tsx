import { Box, Grid } from '@material-ui/core';
import ImageItem from '../image-item/image-item';

/* eslint-disable-next-line */
export interface ImageListProps {
  imageList: Array<string>;
  withPlaceholdersCount?: number;
}

export const ImageList = ({
  imageList,
  withPlaceholdersCount = 16,
}: ImageListProps) => (
  <Grid container mx={0} bgcolor={'white'}>
    {Array.from({ length: withPlaceholdersCount }).map((value) => (
      <Grid item xs={12} sm={3}>
        <Box p={1}>
          <ImageItem src={'xx'} showLightPlaceholder />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default ImageList;
