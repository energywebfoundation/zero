import { Box, Paper } from '@material-ui/core';
import { ReactElement } from 'react';
import {
  ImageListContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import SellerAddFacilitiesImagesForm, {
  SellerAddFacilitiesImagesFormFields,
} from '../../components/seller-add-facilities-images-form/seller-add-facilities-images-form';


export interface SellerAddFacilitiesImagesPageProps {
  initialValues: SellerAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
  children: ReactElement;
}

export const SellerAddFacilitiesImagesPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesImagesPageProps) => (
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
);

export default SellerAddFacilitiesImagesPage;
