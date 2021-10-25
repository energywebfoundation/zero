import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

export enum DeviceRegistryEnum {
  ALL = 'ALL',
  I_REC = 'I-REC',
  REC = 'REC',
  TIGR = 'TIGR',
}

export enum FacilityFinancialSupportTypeEnum {
  GOVERNMENT_SUBSIDIES = 'GOVERNMENT_SUBSIDIES',
  TAX_REBATES = 'TAX_REBATES',
  OTHER = 'OTHER',
}
export enum RenevableEnergySourceEnum {
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  HYDRO_SMALL = 'HYDRO_SMALL',
  HYDRO_LARGE = 'HYDRO_LARGE',
  BIOMASS = 'BIOMASS',
  GEOTHERMAL = 'GEOTHERMAL',
}
export enum EnergyUnitCapacityEnum {
  kWh = 'kWh',
  MWh = 'MWh',
  GWh = 'GWh',
  TWh = 'TWh',
}
export enum DeviceOwnershipEnum {
  OWNER = 'OWNER',
  I_REC_MANAGER = 'I_REC_MANAGER',
  BROKER = 'BROKER',
}

export interface IAddFacilitiesBasicInformationFormFields {
  deviceOwner: string;
  facilityName: string;
  eacRegistries: DeviceRegistryEnum;
  registryId: string;
  source: RenevableEnergySourceEnum;
  deviceOwnership: DeviceOwnershipEnum;
  projectSupportedFinancially: boolean;
  installedCapacity: string;
  capacityUnit: EnergyUnitCapacityEnum;
  certifiedAmount: string;
  amountToBeCertified: string;
  commercialOperationDate: string;
  typeOfFinancialSupport: FacilityFinancialSupportTypeEnum;
}

export const addFacilitiesBasicInformationFormFields: TGenericFormFieldList =
  [
    {
      label:
        'forms.SellerAddFacilitiesBasicInformationForm.deviceOwnerCompanyName',
      type: GenericFormFieldType.TextInput,
      name: 'deviceOwner',
      placeholderText: 'Example LTD',
      required: true
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.facilityName',
      type: GenericFormFieldType.TextInput,
      name: 'facilityName',
      placeholderText: 'Solar farm',
      required: true
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.registryId',
      type: GenericFormFieldType.TextInput,
      name: 'registryId',
      placeholderText: '123...9748',
      required: true
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.facilityId',
      type: GenericFormFieldType.TextInput,
      name: 'facilityId',
      placeholderText: 'Solar farm',
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.eacRegistries',
      type: GenericFormFieldType.Select,
      name: 'eacRegistries',
      multiple: true,
      placeholderText: 'Any',
      options: [
        { label: 'I-REC', value: DeviceRegistryEnum.I_REC },
        { label: 'REC', value: DeviceRegistryEnum.REC },
        { label: 'TIGR', value: DeviceRegistryEnum.TIGR },
      ],
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.source',
      type: GenericFormFieldType.Select,
      name: 'source',
      placeholderText: 'Any',
      options: [
        { label: 'Solar', value: RenevableEnergySourceEnum.SOLAR },
        { label: 'Wind', value: RenevableEnergySourceEnum.WIND },
        {
          label: 'Hydro (small)',
          value: RenevableEnergySourceEnum.HYDRO_SMALL,
        },
        {
          label: 'Hydro (large)',
          value: RenevableEnergySourceEnum.HYDRO_LARGE,
        },
        { label: 'Biomass', value: RenevableEnergySourceEnum.BIOMASS },
        { label: 'Geothermal', value: RenevableEnergySourceEnum.GEOTHERMAL },
      ],
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.deviceOwnership',
      type: GenericFormFieldType.Select,
      name: 'deviceOwnership',
      placeholderText: 'Any',
      options: [
        {
          label: 'I am the Device Owner',
          subText: '(my legal entity owns the device)',
          value: DeviceOwnershipEnum.OWNER,
        },
        {
          label: 'I am the I-REC manager',
          subText:
            "(I don't own the device but I've got exclusive rights to sell I-RECs)",
          value: DeviceOwnershipEnum.I_REC_MANAGER,
        },
        {
          label: 'I am a broker',
          subText: "(I've been authorized)",
          value: DeviceOwnershipEnum.BROKER,
        },
      ],
    },
    {
      label: 'file.addDocumentProof',
      type: GenericFormFieldType.DocumentList,
      name: 'deviceOwnershipDocs',
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.installedCapacity',
      type: GenericFormFieldType.TextInput,
      name: 'installedCapacity',
      placeholderText: '500'
    },
    {
      label: null,
      type: GenericFormFieldType.Select,
      name: 'capacityUnit',
      options: [
        { label: 'kWh', value: EnergyUnitCapacityEnum.kWh },
        { label: 'MWh', value: EnergyUnitCapacityEnum.MWh },
      ],
    },
    {
      label:
        'forms.SellerAddFacilitiesBasicInformationForm.commercialOperationDate',
      type: GenericFormFieldType.DatePicker,
      name: 'commercialOperationDate',
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.certifiedAmount',
      type: GenericFormFieldType.TextInput,
      name: 'certifiedAmount',
      placeholderText: '300'
    },
    {
      label: 'forms.SellerAddFacilitiesBasicInformationForm.amountToBeCertified',
      type: GenericFormFieldType.TextInput,
      name: 'amountToBeCertified',
      placeholderText: '500',
      endAdornment: {
        element: <>{'MWh'}</>
      }
    },
    {
      label:
        'forms.SellerAddFacilitiesBasicInformationForm.projectSupportedFinancially',
      type: GenericFormFieldType.Switch,
      name: 'projectSupportedFinancially',
      infoTooltip: `
      A project that is supported means that it receives financial support from the government.

      Buyers want to know this, especially for some markets,
      because for them it means that this project is more stable and a safer purchase option.
      You should add all available information, especially if it’s in an unregulated markets,
      if this is a new project, or if the device owner or the seller don’t have a long business history `,
    },
    {
      label:
        'forms.SellerAddFacilitiesBasicInformationForm.typeOfFinancialSupport',
      type: GenericFormFieldType.Select,
      name: 'typeOfFinancialSupport',
      options: [
        {
          label: 'Government subsidies',
          value: FacilityFinancialSupportTypeEnum.GOVERNMENT_SUBSIDIES,
        },
        {
          label: 'Tax rebates',
          value: FacilityFinancialSupportTypeEnum.TAX_REBATES,
        },
        {
          label: 'Other',
          value: FacilityFinancialSupportTypeEnum.OTHER,
        },
      ],
    },
  ];
