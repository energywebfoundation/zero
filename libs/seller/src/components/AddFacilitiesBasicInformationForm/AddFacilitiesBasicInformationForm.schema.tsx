import * as yup from 'yup';
import {
  DeviceOwnershipEnum,
  EnergyUnitCapacityEmum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum,
} from './AddFacilitiesBasicInformationForm.fields';

export const addFacilitiesBasicInformationFormSchema = yup
  .object()
  .shape({
    deviceOwner: yup.string().required('Company name is required'),
    facilityName: yup.string().required('Facility name is required'),
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
