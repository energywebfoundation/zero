import {
  useUsersControllerMe,
  useUsersOwnDraftsControllerCreate,
  useUsersOwnDraftsControllerUpdate,
} from '@energyweb/zero-api-client';
import { useCallback, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { FacilityDraft } from './seller-add-facilities-page.types';
import { SellerAddFacilitiesSteps } from './seller-add-facilities-page';

const initialDraftState: FacilityDraft = [
  {
    deviceOwner: null,
    facilityName: null,
    registryId: null,
    eacRegistries: null,
    source: null,
    installedCapacity: null,
    deviceOwnership: null,
    capacityUnit: null,
    commercialOperationDate: null,
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
    greenLabelList: [],
    facilityDocumentList: [],
    sustainabilityDocumentList: [],
  },
  { facilityImageList: [] },
];

export const useSellerAddFacilititesEffects = (draftId?: number) => {
  const [activeStep, setActiveStep] = useState(
    SellerAddFacilitiesSteps.BasicInformation
  );
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
  } = useUsersOwnDraftsControllerCreate();

  const {
    mutateAsync: draftUpdateMutateAsync,
    isLoading: isProcessingDraftUpdate,
  } = useUsersOwnDraftsControllerUpdate();

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

  return {
    isLoading,
    handleNavigateToPrevStep: () =>
      setActiveStep(activeStep > 0 ? activeStep - 1 : 0),
    handleNavigateToNextStep: () => setActiveStep(activeStep + 1),
    activeStep,
    showDraftSavedMsg,
    isProcessingFacilityDraft:
      isProcessingDraftCreate || isProcessingDraftUpdate,
    facilityDraft,
    updateFacilityDraft: (
      facilityFormStep: SellerAddFacilitiesSteps,
      formData: any
    ) => {
      setFacilityDraft((draft) => {
        draft[facilityFormStep as number] = formData;
      });
    },
  };
};
