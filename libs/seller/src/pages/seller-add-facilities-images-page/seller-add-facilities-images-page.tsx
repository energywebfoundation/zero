import styled from '@emotion/styled';
import {
  ImageListContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import SellerAddFacilitiesImagesForm, {
  SellerAddFacilitiesImagesFormFields,
} from '../../components/seller-add-facilities-images-form/seller-add-facilities-images-form';
import { Box, Paper } from '@material-ui/core';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesImagesPageProps {
  initialValues: SellerAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
  children: ReactElement;
}

const StyledSellerAddFacilitiesImagesPage = styled.div``;

export const SellerAddFacilitiesImagesPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesImagesPageProps) => (
  <StyledSellerAddFacilitiesImagesPage>
    <SellerAddFacilitiesImagesForm
      initialValues={initialValues}
      submitHandler={submitHandler}
    >
      <>
        <Box my={2}>
          <Paper sx={{ p: 3 }}>
            <ImageListContainer imageList={initialValues.facilityImageList} />
          </Paper>
        </Box>
        {children}
      </>
    </SellerAddFacilitiesImagesForm>
  </StyledSellerAddFacilitiesImagesPage>
);

export default SellerAddFacilitiesImagesPage;
