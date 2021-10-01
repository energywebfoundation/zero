import { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import {
  GreenLabelForm,
  IGreenLabel,
  GreenLabelTypeEnum,
} from '../GreenLabelForm';
import { GreenLabelListItem } from '../GreenLabelListItem';

export interface GreenLabelListProps {
  greenLabelList: ReadonlyArray<IGreenLabel>;
  handleAddNewGreenLabel: (newGreenLabel: IGreenLabel) => void;
  handleDeleteGreenLabel: (greenLabelType: GreenLabelTypeEnum) => void;
  handleUpdateGreenLabel: (
    greenLabelType: GreenLabelTypeEnum,
    greenLabel: IGreenLabel
  ) => void;
}

export const GreenLabelList: FC<GreenLabelListProps> = ({
  greenLabelList = [],
  handleAddNewGreenLabel,
  handleUpdateGreenLabel,
  handleDeleteGreenLabel,
}) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            {greenLabelList.map((data, index) => (
              <Box key={index}>
                <GreenLabelListItem
                  handleDeleteGreenLabel={handleDeleteGreenLabel}
                  handleUpdateGreenLabel={handleUpdateGreenLabel}
                  data={data}
                />
              </Box>
            ))}
            <Box>
              <GreenLabelForm
                submitHandler={async (values) => {
                  handleAddNewGreenLabel({
                    type: values.greenLabel,
                    proofDocumentId: null,
                  });
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
