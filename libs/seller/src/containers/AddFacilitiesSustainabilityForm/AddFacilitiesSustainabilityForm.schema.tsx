import * as yup from 'yup';

export const addFacilitiesSustainAbilityFormSchema = yup.object().shape({
  facilityStory: yup.string().min(10).max(3000),
  facilityDocumentList: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  impactStory: yup.string().min(10).max(2000),
  sustainabilityDocumentList: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      description: yup.string().required(),
    })
  ),
});
