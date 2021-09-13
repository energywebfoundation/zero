import { useFetchUserFileListEffect } from './effects/fetch-user-file-list.effect';

export const useFileListContainerEffects = () => {
  const { data, isFetched } = useFetchUserFileListEffect();
  return { userFileList: { data, isFetched } };
};
