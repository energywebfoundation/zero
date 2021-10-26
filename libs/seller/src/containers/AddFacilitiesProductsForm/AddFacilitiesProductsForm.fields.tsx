import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';
import { Typography } from '@material-ui/core';
import { Dayjs } from 'dayjs';
import { AddProductsFormButton, AddProductsHeading } from '../../components';
import { nestedFieldsValidationSchema } from './AddFacilitiesProductsForm.schema';

export type ProductFormValues = {
  id: number;
  values: {
    generationStartDate: Dayjs;
    generationEndDate: Dayjs;
    // change to enum
    eacStatus: string;
    totalCapacity: string;
    price: string;
    infoAboutPrice: string;
  }
}

export interface IAddFacilitiesProductsFormFields {
  products: ProductFormValues[];
}

export const addFacilitiesProductsFormFields: TGenericFormFieldList = [
  {
    label: '',
    type: GenericFormFieldType.NestedForms,
    name: 'products',
    heading: AddProductsHeading,
    addFormButton: AddProductsFormButton,
    initialValues: {
      generationStartDate: '',
      generationEndDate: '',
      eacStatus: '',
      totalCapacity: '',
      price: '',
      infoAboutPrice: ''
    },
    validationSchema: nestedFieldsValidationSchema,
    validationMode: 'onBlur',
    nestedFields: [
      {
        name: 'generationStartDate',
        label: 'forms.SellerAddFacilitiesProductsForm.generationStartDate',
        type: GenericFormFieldType.DatePicker
      },
      {
        name: 'generationEndDate',
        label: 'forms.SellerAddFacilitiesProductsForm.generationEndDate',
        type: GenericFormFieldType.DatePicker
      },
      {
        name: 'eacStatus',
        label: 'forms.SellerAddFacilitiesProductsForm.eacStatus',
        type: GenericFormFieldType.Select,
        // should add actual options as a enum
        options: [
          {value: 'Future', label: 'Future'},
          {value: 'Issued', label: 'Issued'}
        ]
      },
      {
        name: 'totalCapacity',
        label: 'forms.SellerAddFacilitiesProductsForm.totalCapacity',
        placeholderText: '0',
        type: GenericFormFieldType.TextInput,
        endAdornment: {
          element: <Typography color="primary" fontWeight={700}>MWh</Typography>
        }
      },
      {
        name: 'price',
        label: 'forms.SellerAddFacilitiesProductsForm.price',
        placeholderText: '0.00',
        type: GenericFormFieldType.TextInput,
        endAdornment: {
          element: <Typography color="primary" fontWeight={700}>US $ /MWh</Typography>
        }
      },
      {
        name: 'infoAboutPrice',
        label: 'forms.SellerAddFacilitiesProductsForm.infoAboutPrice',
        type: GenericFormFieldType.TextInput,
        placeholderText: 'forms.SellerAddFacilitiesProductsForm.infoAboutPricePlaceholder',
      }
    ]
  },
];
