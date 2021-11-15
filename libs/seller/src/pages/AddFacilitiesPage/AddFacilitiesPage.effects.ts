import {
  useUsersControllerMe,
  useDraftsControllerCreate,
  useDraftsControllerUpdate,
  useUsersControllerFindAllUserDrafts,
  DraftDto,
  UpdateDraftDtoData,
  getUsersControllerFindAllUserDraftsQueryKey,
} from '@energyweb/zero-api-client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Dayjs } from 'dayjs';
import { BreadcrumbItem } from '@energyweb/zero-ui-core';
import { EnergyUnitCapacityEnum } from '../../containers';
import { FacilityDraft, FacilityDraftItem } from './AddFacilitiesPage.types';
import { SellerAddFacilitiesSteps } from './AddFacilitiesPage';

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
  { products: [{
    id: Date.now(),
    values: {
      generationStartDate: {} as Dayjs,
      generationEndDate: {} as Dayjs,
      eacStatus: '',
      totalCapacity: '',
      price: '',
      infoAboutPrice: ''
    }
  }] }
];

export const useSellerAddFacilititesEffects = () => {
  const [activeStep, setActiveStep] = useState(
    SellerAddFacilitiesSteps.BasicInformation
  );
  const { data: user, isLoading: isUserLoading } = useUsersControllerMe();
  const userId = user?.id ?? 0;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const allUserDraftsQueryKey = getUsersControllerFindAllUserDraftsQueryKey(userId);

  const { data: userDrafts, isLoading: areDraftsLoading } = useUsersControllerFindAllUserDrafts(userId, { query: { enabled: !!userId } });
  const userFacilityDrafts = userDrafts?.length ?
    userDrafts.find(draft => draft.draftType === 'facility')
    : ({} as DraftDto);
  const facilityDraft = userFacilityDrafts?.data as FacilityDraftItem[] ?? initialDraftState;

  const {
    mutate: createDraft,
    isLoading: isCreateDraftMutating,
    isSuccess: isDraftCreateSuccess,
    isError: isDraftCreateError
  } = useDraftsControllerCreate();
  const {
    mutate: updateDraft,
    isLoading: isUpdateDraftMutating,
    isSuccess: isDraftUpdateSuccess,
    isError: isDraftUpdateError
  } = useDraftsControllerUpdate();

  const createOrUpdateDraft = (draftId: number | undefined, draftData: FacilityDraftItem[]) => {
    if (draftId) {
      updateDraft(
        { id: draftId, data: (draftData as UpdateDraftDtoData) },
        { onSuccess: () => queryClient.refetchQueries(allUserDraftsQueryKey)}
      );
    } else {
      createDraft(
        { data: { draftType: 'facility', data: draftData } },
        { onSuccess: () => queryClient.refetchQueries(allUserDraftsQueryKey)}
      );
    };
  }

  const handleNavigateToPrevStep = () => {
    if (activeStep <= 0) {
      navigate('/account/dashboard');
      return;
    }
    setActiveStep((prev) => prev - 1)
  };

  const updateFacilityDraft = (
    facilityFormStep: SellerAddFacilitiesSteps,
    formData: FacilityDraftItem
  ) => {
    const newDraft = facilityDraft.map((formStepData, index) => {
      if (index === facilityFormStep) return formData;
      return formStepData
    })
    createOrUpdateDraft(userFacilityDrafts?.id, newDraft);
  };

  const handleNavigateToNextStep = (formData: FacilityDraftItem) => {
    updateFacilityDraft(activeStep, formData);
    setActiveStep(activeStep+1);
  };

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

  const isLoading = isUserLoading || areDraftsLoading || facilityDraft.length < 1;
  const isProcessing = isCreateDraftMutating || isUpdateDraftMutating;
  const showDraftSavedMsg = (isDraftCreateSuccess || isDraftUpdateSuccess) && (!isDraftUpdateError || !isDraftCreateError);

  return {
    isLoading,
    isProcessing,
    showDraftSavedMsg,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
    activeStep,
    facilityDraft,
    updateFacilityDraft,
    breadcrumbsList
  };
};
