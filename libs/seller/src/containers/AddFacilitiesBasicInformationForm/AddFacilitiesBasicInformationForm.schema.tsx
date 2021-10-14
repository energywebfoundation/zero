import * as yup from 'yup';
import {
  DeviceOwnershipEnum,
  EnergyUnitCapacityEnum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum,
} from './AddFacilitiesBasicInformationForm.fields';

export const addFacilitiesBasicInformationFormSchema = yup
  .object()
  .shape({
    deviceOwner: yup.string().required('Company name is required'),
    facilityName: yup.string().required('Facility name is required'),
    facilityId: yup.string(),
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
    deviceOwnership: yup
      .string()
      .oneOf([
        DeviceOwnershipEnum.OWNER,
        DeviceOwnershipEnum.BROKER,
        DeviceOwnershipEnum.I_REC_MANAGER,
      ]),
    projectSupportedFinancially: yup.boolean(),
    installedCapacity: yup.number(),
    capacityUnit: yup
      .string()
      .oneOf([EnergyUnitCapacityEnum.MWh, EnergyUnitCapacityEnum.kWh]),
    commercialOperationDate: yup.date(),
    certifiedAmount: yup.number(),
    amountToBeCertified: yup.number(),
    typeOfFinancialSupport: yup
      .string()
      .oneOf([
        FacilityFinancialSupportTypeEnum.TAX_REBATES,
        FacilityFinancialSupportTypeEnum.GOVERNMENT_SUBSIDIES,
        FacilityFinancialSupportTypeEnum.OTHER,
      ]),
  });
