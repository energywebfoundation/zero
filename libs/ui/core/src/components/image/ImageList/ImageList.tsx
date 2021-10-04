import { Box, Grid } from '@material-ui/core';
import { ImageItem } from '../ImageItem';

export interface ImageListProps {
  imageList: Array<string>;
  withPlaceholdersCount?: number;
}

export const ImageList = ({
  imageList,
  withPlaceholdersCount = 16,
}: ImageListProps) => (
  <Grid container mx={0} bgcolor={'white'}>
    {Array.from({ length: withPlaceholdersCount }).map((value, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box p={1}>
          <ImageItem src={imageList[index]} showLightPlaceholder />
        </Box>
      </Grid>
    ))}
  </Grid>
);
