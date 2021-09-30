import { Box, Paper } from '@material-ui/core';
import { ReactElement } from 'react';
import {
  ImageListContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import {
  AddFacilitiesImagesForm,
  IAddFacilitiesImagesFormFields,
} from '../../components';


export interface AddFacilitiesImagesContainerProps {
  initialValues: IAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesImagesFormFields>;
  children: ReactElement;
}

export const AddFacilitiesImagesContainer = ({
  submitHandler,
  initialValues,
  children,
}: AddFacilitiesImagesContainerProps) => (
    <AddFacilitiesImagesForm
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
    </AddFacilitiesImagesForm>
);
