import {
  GenericFormCard,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
import { AddFacilitiesLocationForm, IAddFacilitiesLocationFormFields } from '../../components';

export interface AddFacilitiesLocationContainerProps {
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesLocationFormFields>;
  initialValues: IAddFacilitiesLocationFormFields;
  children: ReactElement;
}

export const AddFacilitiesLocationContainer = ({
  submitHandler,
  initialValues,
  children,
}: AddFacilitiesLocationContainerProps) => {
  const { t } = useTranslation();
  return (
      <GenericFormCard>
        <Typography color={'primary'} fontSize={'20px'} fontWeight={700}>
          {t('forms.SellerAddFacilitiesLocationForm.location')}
        </Typography>
        <AddFacilitiesLocationForm
          initialValues={initialValues}
          submitHandler={submitHandler}
        >
          {children}
        </AddFacilitiesLocationForm>
      </GenericFormCard>
  );
};
