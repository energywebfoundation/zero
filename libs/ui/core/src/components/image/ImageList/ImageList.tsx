import { Box, Grid } from '@material-ui/core';
import { ImageItem } from '../ImageItem';

export interface ImageListProps {
  imageList: string[];
  fileDeleteHandler?: (fileId: string) => Promise<void> | void;
}

export const ImageList = ({
  imageList,
  fileDeleteHandler
}: ImageListProps) => (
  <Grid container mx={0} bgcolor={'white'}>
    {imageList.map((url) => (
      <Grid item xs={12} sm={3} key={url}>
        <Box p={1}>
          {/* mock for dev */}
          <ImageItem
          fileId='123'
          fileDeleteHandler={fileDeleteHandler}
          src={url} />
          {/* src={'https://i2-prod.dailypost.co.uk/incoming/article20158227.ece/ALTERNATES/s615/0_Energy-giant-EDF-Renewables-UK-has-snapped-up-solar-projects-Burwell-499-MW-project-in-South-East.jpg'} /> */}
        </Box>
      </Grid>
    ))}
  </Grid>
);
