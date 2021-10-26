import * as yup from 'yup';

export const productsFieldValidationSchema = yup.object().shape({
  products: yup.array()
})

export const nestedFieldsValidationSchema = yup.object().shape({
  generationStartDate: yup.object(),
  generationEndDate: yup.object(),
  // should validate over enum
  eacStatus: yup.string(),
  totalCapacity: yup.string(),
  price: yup.string(),
  infoAboutPrice: yup.string()
})
