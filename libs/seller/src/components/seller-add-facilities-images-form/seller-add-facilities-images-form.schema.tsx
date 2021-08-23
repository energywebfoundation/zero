import * as yup from 'yup';

export const sellerAddFacilitiesImagesFormSchema = yup.object().shape({
  imageList: yup.array(),
});
