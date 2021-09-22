import * as yup from 'yup';
import {
  EnergyUnitCapacityEmum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum,
} from './seller-add-facilities-basic-information-form-fields';

export const sellerAddFacilitiesBasicInformationFormSchema = yup
  .object()
  .shape({
    deviceOwner: yup.string().required('Company name is required'),
    facilityName: yup.string().required('Company name is required'),
    registryId: yup.string().required('Registry ID is required'),
    eacRegistries: yup.string(),
    source: yup
      .string()
      .oneOf([
        RenevableEnergySourceEnum.SOLAR,
        RenevableEnergySourceEnum.HYDRO_SMALL,
        RenevableEnergySourceEnum.HYDRO_LARGE,
        RenevableEnergySourceEnum.BIOMASS,
        RenevableEnergySourceEnum.WIND,
        RenevableEnergySourceEnum.GEOTHERMAL,
      ]),
    deviceOwnership: yup.string(),
    projectSupportedFinancially: yup.boolean(),
    installedCapacity: yup.number(),
    capacityUnit: yup
      .string()
      .oneOf([EnergyUnitCapacityEmum.MWh, EnergyUnitCapacityEmum.kWh]),
    commercialOperationDate: yup.date(),
    typeOfFinancialSupport: yup
      .string()
      .oneOf([
        FacilityFinancialSupportTypeEnum.TAX_REBATES,
        FacilityFinancialSupportTypeEnum.GOVERNMENT_SUBSIDIES,
        FacilityFinancialSupportTypeEnum.OTHER,
      ]),
  });
