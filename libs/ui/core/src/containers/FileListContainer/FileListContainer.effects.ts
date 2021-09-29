import { useFetchUserFileListEffect } from './FetchUserFileList.effect';

export const useFileListContainerEffects = () => {
  const { data, isFetched } = useFetchUserFileListEffect();
  return {
    userFileList: { data, isFetched },
    isProcessing: false,
    handleDeleteRequest: (filename: string) => {console.log('handleDeleteRequest')},
  };
};
