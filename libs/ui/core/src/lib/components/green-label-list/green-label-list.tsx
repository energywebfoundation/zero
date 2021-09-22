import styled from '@emotion/styled';
import { Box, Grid } from '@material-ui/core';
import React from 'react';
import GreenLabelForm, {
  GreenLabelDto,
  GreenLabelTypeEnum,
} from '../green-label-form/green-label-form';
import GreenLabelListItem from '../green-label-list-item/green-label-list-item';

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
                <GreenLabelListItem
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
