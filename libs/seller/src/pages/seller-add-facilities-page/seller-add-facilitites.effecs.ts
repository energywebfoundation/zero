import { useUsersDraftsControllerCreate } from '@energyweb/zero-ui-api';
import { useSelector } from 'react-redux';
import { authStateSelectors } from '@energy-web-zero/store-configure';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { SellerAddFacilitiesBasicInformationFormFields } from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import { SellerAddFacilitiesSteps } from '@energy-web-zero/seller';

export const useSellerAddFacilititesEffects = () => {
  const { mutateAsync } = useUsersDraftsControllerCreate();
  const authenticatedUserId = useSelector(authStateSelectors.userProfileData)
    ?.id as number;
  const navigate = useNavigate();

  const handleFormSubmit: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields> =
    useCallback(
      (createUserData) =>
        mutateAsync({
          userId: authenticatedUserId,
          data: { data: {}, draftType: 'facility' },
        })
          .then((value) => {
            console.log(value);
          })
          .catch((reason) => console.log(reason)),
      [mutateAsync, authenticatedUserId]
    );

  return {
    handleFormSubmit,
  };
};
