import * as yup from 'yup';

export const addFacilitiesImagesFormSchema = yup.object().shape({
  imageList: yup.array(),
});
