import {
  useUsersControllerMe,
  useDraftsControllerCreate,
  useDraftsControllerUpdate,
} from '@energyweb/zero-api-client';
import { useCallback, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { FacilityDraft } from './AddFacilitiesPage.types';
import { SellerAddFacilitiesSteps } from './AddFacilitiesPage';
import { BreadcrumbItem } from '@energyweb/zero-ui-core';
import { EnergyUnitCapacityEnum } from '../../containers';
import { useNavigate } from 'react-router-dom';

const initialDraftState: FacilityDraft = [
  {
    deviceOwner: null,
    facilityName: null,
    registryId: null,
    eacRegistries: null,
    source: null,
    installedCapacity: null,
    deviceOwnership: null,
    capacityUnit: EnergyUnitCapacityEnum.MWh,
    commercialOperationDate: null,
    certifiedAmount: null,
    amountToBeCertified: null,
    projectSupportedFinancially: false,
    typeOfFinancialSupport: null,
  },
  {
    country: null,
    region: null,
    address: null,
    gridOperator: null,
    latitude: '47.166168',
    longitude: '8.515495',
  },
  {
    facilityStory: null,
    impactStory: null,
    greenLabel: [],
    facilityDocumentList: [],
    sustainabilityDocumentList: [],
  },
  { facilityImageList: [] },
];



export const useSellerAddFacilititesEffects = (draftId?: number) => {
  const [activeStep, setActiveStep] = useState(
    SellerAddFacilitiesSteps.BasicInformation
  );
  const navigate = useNavigate();
  const [facilityDraftId, setFacilityDraftId] = useState(draftId);
  const [showDraftSavedMsg, setShowDraftSavedMsg] = useState(false);
  const [isDraftDirty, setIsDraftDirty] = useState(false);
  const [facilityDraft, setFacilityDraft] =
    useImmer<FacilityDraft>(initialDraftState);

  const { data: user, isLoading } = useUsersControllerMe();

  const authenticatedUserId = user?.id;

  const {
    mutateAsync: draftCreateMutateAsync,
    isLoading: isProcessingDraftCreate,
  } = useDraftsControllerCreate();

  const {
    mutateAsync: draftUpdateMutateAsync,
    isLoading: isProcessingDraftUpdate,
  } = useDraftsControllerUpdate();

  const handleCreateFacility = useCallback(
    () =>
      draftCreateMutateAsync({
        data: { data: facilityDraft, draftType: 'facility' },
      })
        .then((res) => {
          const { id } = res as { id: number };
          setFacilityDraftId(id);
          setShowDraftSavedMsg(true);
          setTimeout((args) => setShowDraftSavedMsg(false), 2000);
          // notificationStateActions.addNotification({
          //   text: { firstLine: 'Facility draft created successfully' },
          //   type: NotificationType.Success,
          // });
        })
        .catch((reason) => {
          console.log(reason);
          // notificationStateActions.addNotification({
          //   text: {
          //     firstLine: 'Error creating facility draft',
          //   },
          //   type: NotificationType.Error,
          // });
        }),
    [draftCreateMutateAsync, authenticatedUserId]
  );

  const handleUpdateFacility = useCallback(
    () =>
      draftUpdateMutateAsync({
        data: facilityDraft as any,
        id: facilityDraftId!,
      })
        .then((value) => {
          setShowDraftSavedMsg(true);
          setTimeout((args) => setShowDraftSavedMsg(false), 2000);
          // notificationStateActions.addNotification({
          //   text: { firstLine: 'Facility draft updated successfully' },
          //   type: NotificationType.Success,
          // });
        })
        .catch((reason) => {
          console.log(reason);
          // notificationStateActions.addNotification({
          //   text: {
          //     firstLine: 'Error updating facility draft',
          //   },
          //   type: NotificationType.Error,
          // });
        }),
    [draftUpdateMutateAsync, authenticatedUserId]
  );

  const handleNavigateToPrevStep = () => {
    if(activeStep <= 0) {
      navigate('/account/dashboard');
      return;
    }
    setActiveStep((prev) => prev - 1)
  };

  const handleNavigateToNextStep = () => setActiveStep((prev) => prev+1);

  const updateFacilityDraft = (
    facilityFormStep: SellerAddFacilitiesSteps,
    formData: any
  ) => {
    setFacilityDraft((draft) => {
      draft[facilityFormStep as number] = formData;
    });
  };

  useEffect(() => {
    if (isDraftDirty) {
      if (!facilityDraftId)
        handleCreateFacility().then((value) => {
          setIsDraftDirty(false);
        });
      else {
        handleUpdateFacility().then((value) => {
          setIsDraftDirty(false);
        });
      }
    }
  }, [isDraftDirty]);

  const breadcrumbsList: BreadcrumbItem[] = [
    {
      name: 'Account',
      url: '/account'
    },
    {
      name: 'Dashboard',
      url: '/account/dashboard'
    },
    {
      name: 'Add products',
      url: '/seller/products'
    },
    {
      name: 'Add facilities'
    }
  ];

  const isProcessingFacilityDraft = isProcessingDraftCreate || isProcessingDraftUpdate;

  return {
    isLoading,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
    activeStep,
    showDraftSavedMsg,
    isProcessingFacilityDraft,
    facilityDraft,
    updateFacilityDraft,
    breadcrumbsList
  };
};
